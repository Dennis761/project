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
        
        const findProduct = await ProductModel.findById(id);
        
        if (!findProduct) {
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

        findProduct.saved.push(userId)
        await findProduct.save();
        res.status(200).json({ 
            savedId: id,
            saves: findProduct.saved.length,
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
            saves: findProduct.saved.length,
            message: `The product was successfully removed from the user's saves`
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server error'
        });
    }
};

export const rateOne = async (req, res) => {
    const userId = req.userId;
    const { id, rating } = req.body;

    try {
        // Check if the user has already rated this product
        const user = await UserModel.findById(userId);
        const productIndex = user.rated.findIndex(item => item.id === id);

        if (productIndex === -1) {
            // If the product has not yet been rated by the user
            await UserModel.findOneAndUpdate(
                { _id: userId },
                { $push: { rated: { id: id, rating: rating } } }
            );

            const product = await ProductModel.findById(id);
            const newTotal = product.rating.total + rating;
            const newCount = [...product.rating.count, userId];
            const newAverage = (newTotal / newCount.length).toFixed(1);

            await ProductModel.findOneAndUpdate(
                { _id: id },
                {
                    'rating.total': newTotal,
                    'rating.count': newCount,
                    'rating.average': newAverage
                }
            );

            res.status(200).json({ 
                average: newAverage, 
                rate: rating 
            });
        } else {
            // If the product has already been rated by the user
            const product = await ProductModel.findById(id);

            // Calculate the new total product rating
            const newTotal = product.rating.total - user.rated[productIndex].rating + rating;

            // Update the count array
            const newCount = product.rating.count.map(String); // Convert user ids to strings
            const userIndex = newCount.indexOf(String(userId)); // Looking for the index of the current user
            if (userIndex !== -1) {
                newCount[userIndex] = String(userId); // Update the rating of the current user
            }

            // Update the average product rating
            const newAverage = newTotal / newCount.length;

            await ProductModel.findOneAndUpdate(
                { _id: id },
                {
                    'rating.total': newTotal,
                    'rating.average': newAverage
                }
            );

            // Update user rating in UserModel
            await UserModel.findOneAndUpdate(
                { _id: userId, 'rated.id': id },
                { $set: { 'rated.$.rating': rating } }
            );
            res.status(200).json({ 
                average: newAverage, 
                rate: rating 
            });
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to rate the product.');
    }
}