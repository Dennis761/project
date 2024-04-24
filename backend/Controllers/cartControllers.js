import ProductModel from '../Models/ProductModel.js'
import UserModel from '../Models/UserModel.js'

export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' });
        }
    
        const date = new Date()
    
        const { id } = req.body;
    
        if (!id) {
            return res.status(404).json({ 
                error: 'Product ID not specified' });
        }

        const findProduct = await ProductModel.findById(id)
        if (!findProduct) {
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
    
        const findUserPurchases = findUser.purchases;
    
        if (findUserPurchases.includes(id)) {
            return res.json({ 
                message: 'Product has already been purchased' 
            });
        }
    
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $push: { purchases: id } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(403).json({
                error: 'Product not updated'
            });
        }

        const user = await UserModel.findById(userId)
        user.history.unshift({action: 'Product added to cart', product: id, date: date})

        await user.save()
    
        res.status(200).json({
            message: 'Product added',
            user: updatedUser,
            product: findProduct 
        })
    } catch (error) {
        return res.status(500).json({ 
            error: 'Server error' 
        });
    }
}

export const cartList = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified' });
        }

        const findUser = await UserModel.findById(userId);
        
        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const findPurchasePromises = findUser.purchases.map(id => ProductModel.findById(id));

        const foundProducts = await Promise.all(findPurchasePromises);

        res.status(200).json({
            message: 'You got all products',
            foundProducts
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: 'User ID not specified'
            });
        }

        const { id } = req.body;
        const date = new Date();

        if (!id) {
            return res.status(400).json({
                error: 'Product ID not specified'
            });
        }

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const updateResult = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $pull: { purchases: id }, $push: { history: { action: 'Product removed from cart', product: id, date: date } } },
            { new: true }
        );

        if (!updateResult) {
            return res.status(404).json({
                error: 'Product is not found in cart'
            });
        }

        res.status(200).json({
            message: 'Product successfully removed from cart',
            removedId: id
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
}