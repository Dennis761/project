import ProductModel from '../Models/ProductModel.js'
import UserModel from '../Models/UserModel.js'
import jwt from 'jsonwebtoken';

export const getAllProducts = async (req, res) => {
    try {
        const userId = req.userId
        const {products, pages} = req.query
        
        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' 
            });
        }

        const {country} = await UserModel.findById(userId)

        const findProducts = await ProductModel.find({location: country})

        if (!findProducts) {
            return res.status(404).json({
                success: 'Product not found'
            });
        }

        function generateRecommendations(product) {
            const weightRating = 0.5;
            const weightSaves = 0.3;
            const weightViews = 0.2;
         
            product.forEach(product => {
                product.totalScore = (product.rating * weightRating) + 
                                     (product.saves * weightSaves) + 
                                     (product.views * weightViews);
            });

            const multiply = products*pages
            const restProducts = product.length - multiply

            if(restProducts <= products && restProducts>=0){
                const recommendations = product.splice(multiply, restProducts)
                return recommendations
            }

            if(restProducts > products && restProducts>=0){
                const recommendations = product.splice(multiply, products);
                return recommendations;
            }

            if(multiply >= product.length){
                return []
            }

            if(product.length<20){
                return product
            }
            
        }

        const productsList = generateRecommendations(findProducts)

        res.status(200).json({
            productsList
        });
        
    } catch (error) {
        res.status(500).json({
            success: 'Server error'
        }) 
    }
}
 
export const getOneProduct = async (req, res) => {
    try {
        const productById = req.params.productId;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' 
            });
        }

        const date = new Date();

        const doc = await ProductModel.findOneAndUpdate(
            { _id: productById },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!doc) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        const findUser = await UserModel.findById(userId);

        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const {creator} = doc

        const findProductCreator = await UserModel.findById(creator)

        const token = jwt.sign({
            _id: creator
        }, 'user-secret-code');

        const { name } = findProductCreator._doc

        const checkSavedProduct = findUser.saved.indexOf(productById.toString()) !== -1;

        const checkRatedProduct = findUser.rated.find(product => product.id === productById.toString());

        let ratedProduct;
        if (checkRatedProduct !== undefined) {
            ratedProduct = checkRatedProduct.rating;
                } 
                    else {
            ratedProduct = null;
        }

        findUser.history.unshift({ action: 'Viewed', product: productById, date: date });

        await findUser.save();

        res.status(200).json({ 
            doc, 
            ratedProduct,
            checkSavedProduct,
            userData: {
                name,
                token
              }
          })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};

export const findAllProducts = async (req, res) => {
    try {
        const productByTitle = req.params.title;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' 
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ 
                error: 'User not found' 
            });
        }

        const doc = await ProductModel.find({ title: productByTitle});

        if (!doc) {
            return res.status(404).json({ 
                error: 'Product not found' 
            });
        }

        await user.save();

        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({ 
            error: 'Server error' 
        });
    }
};

export const savedList = async (req, res) => {
    try {
        const userId = req.userId;
        const {products, pages} = req.query

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' 
            });
        }

        const findUser = await UserModel.findById(userId);
        
        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const findProductPromises = findUser.saved.map(id => ProductModel.findById(id));

        const foundSavedProducts = await Promise.all(findProductPromises);

        function generateSavedLine (savedList){
            const multiply = products*pages
            const restProducts = savedList.length - multiply

            if(restProducts <= products && restProducts>=0){
                const recommendations = savedList.splice(multiply, restProducts)
                return recommendations
            }

            if(restProducts > products && restProducts>=0){
                const recommendations = savedList.splice(multiply, products);
                return recommendations;
            }

            if(multiply >= savedList.length){
                return []
            }

            if(savedList.length<20){
                return savedList
            }
    }

    const savedNewList = generateSavedLine(foundSavedProducts)

        res.status(200).json({
            savedProducts: savedNewList
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
};

export const ratedList = async (req, res) => {
    try {
        const userId = req.userId;
        const {products, pages} = req.query

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' 
            });
        }

        const findUser = await UserModel.findById(userId);
        
        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
 
        const ratedProduct = findUser.rated.map(ratedItem => ratedItem.id);

        const findProductPromises = ratedProduct.map(id => ProductModel.findById(id));

        const foundRatedProducts = await Promise.all(findProductPromises);

        function generateRatedLine (ratedList){
            const multiply = products*pages
            const restProducts = ratedList.length - multiply

            if(restProducts <= products && restProducts>=0){
                const recommendations = ratedList.splice(multiply, restProducts)
                return recommendations
            }

            if(restProducts > products && restProducts>=0){
                const recommendations = ratedList.splice(multiply, products);
                return recommendations;
            }

            if(multiply >= ratedList.length){
                return []
            }

            if(ratedList.length<20){
                return ratedList
            }
        }

    const ratedNewList = generateRatedLine(foundRatedProducts)

    res.status(200).json({
            foundRatedProducts: ratedNewList
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
};
