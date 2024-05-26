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
            const weightViews = 0.02;

            let productScore = []

            product.forEach(product => {
                let totalScore = (product.rating * weightRating) + 
                                     (product.saves * weightSaves) + 
                                     (product.views * weightViews);
                productScore.push(totalScore)
            });

            Array.prototype.shellsortFunc = function(collection) {
                let arr = this;
                if (arr.length !== collection.length) {
                    throw new Error("Arr length is not equal to collection length");
                }
            
                const swap = (arr, collection, i, j) => {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    [collection[i], collection[j]] = [collection[j], collection[i]];
                }
            
                const generateSedgewickSequence = (n) => {
                    let sequence = [];
                    let k = 0;
                    while (true) {
                        let gap;
                        if (k % 2 === 0) {
                            gap = 9 * (1 << (2 * k)) - 9 * (1 << k) + 1;
                        } else {
                            gap = (1 << (2 * k + 1)) + 3 * (1 << k) + 1;
                        }
                        if (gap > n) break;
                        sequence.unshift(gap);
                        k++;
                    }
                    return sequence;
                }
            
                const gaps = generateSedgewickSequence(arr.length);
            
                for (let gap of gaps) {
                    for (let i = gap; i < arr.length; i++) {
                        let j = i;
                        while (j >= gap && arr[j - gap] > arr[j]) {
                            swap(arr, collection, j, j - gap);
                            j -= gap;
                        }
                    }
                }
            
                return collection;
            }

            const sorted = productScore.shellsortFunc(product)
            const multiply = products*pages
            const restProducts = sorted.length - multiply

            if(restProducts <= products && restProducts>=0){
                const recommendations = sorted.splice(multiply, restProducts)
                return recommendations
            }

            if(restProducts > products && restProducts>=0){
                const recommendations = sorted.splice(multiply, products);
                return recommendations;
            }

            if(multiply >= sorted.length){
                return []
            }

            if(sorted.length<20){
                return sorted
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

        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: productById },
            { $inc: { viewsCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!updatedProduct) {
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

        const {creator} = updatedProduct

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
            updatedProduct, 
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

        const findUser = await UserModel.findById(userId);

        if (!findUser) {
            return res.status(404).json({ 
                error: 'User not found' 
            });
        }

        const foundProductsByTitle = await ProductModel.find({ title: productByTitle});

        if (!foundProductsByTitle) {
            return res.status(404).json({ 
                error: 'Product not found' 
            });
        }

        await findUser.save();
        res.status(200).json(foundProductsByTitle);
    } catch (error) {
        res.status(500).json({ 
            error: 'Server error' 
        });
    }
};

