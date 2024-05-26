import ProductModel from '../Models/ProductModel.js'
import UserModel from '../Models/UserModel.js'

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

            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: id },
                {
                    'rating.total': newTotal,
                    'rating.count': newCount,
                    'rating.average': newAverage
                }
            );

            res.status(200).json({ 
                average: newAverage, 
                rated: rating,
                updatedProduct
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
            const newAverage = (newTotal / newCount.length).toFixed(1);

            const updatedProduct = await ProductModel.findOneAndUpdate(
                { _id: id },
                {
                    'rating.total': newTotal,
                    'rating.average': newAverage
                },
                { new: true }
            );

            // Update user rating in UserModel
            await UserModel.findOneAndUpdate(
                { _id: userId, 'rated.id': id },
                { $set: { 'rated.$.rating': rating } }
            );
            res.status(200).json({ 
                average: newAverage, 
                rated: rating,
                updatedProduct
            });
        }
    } catch (error) {
        console.error(error);
        throw new Error('Failed to rate the product.');
    }
}

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