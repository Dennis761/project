import ProductModel from '../Models/ProductModel.js'
import UserModel from '../Models/UserModel.js'

export const saveOne = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' 
            });
        }

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                error: 'Product ID not provided'
            });
        }

        const findUser = await UserModel.findById(userId);
        
        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        
        const foundProduct = await ProductModel.findById(id);
        
        if (!foundProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        const findUserSaves = findUser.saved.indexOf(id);

        if(findUserSaves !== -1) {
            return res.json({
                message: 'This product is already saved'
            });
        }

        await UserModel.findByIdAndUpdate(
            userId,
            { $push: { saved: id } },
            { new: true } 
        );

        foundProduct.saved.push(userId)
        await foundProduct.save();
        res.status(200).json({ 
            foundProduct,
            currentSaves: foundProduct.saved.length,
            message: 'Product successfully saved' });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
};

export const removeSaved = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' 
            });
        }

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                error: 'Product ID not provided'
            });
        }

        const findUser = await UserModel.findById(userId);
        
        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const findProduct = await ProductModel.findById(id);
        
        if (!findProduct) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        const findUserSavedIndex = findUser.saved.indexOf(id);

        if (findUserSavedIndex === -1) {
            return res.status(404).json({
                error: `The specified product was not found in the user's saves`
            });
        }

        findUser.saved.splice(findUserSavedIndex, 1);
        await findUser.save();

        findProduct.saved.splice(findProduct.saved.indexOf(userId), 1); 
        await findProduct.save();

        res.status(200).json({
            removedId: id,
            currentSaves: findProduct.saved.length,
            message: `The product was successfully removed from the user's saves`
        });
    } catch (error) {
        return res.status(500).json({
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