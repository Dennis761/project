import ProductModel from '../Models/ProductModel.js'
import UserModel from '../Models/UserModel.js'
import mongoose from 'mongoose';

export const removeFromHistoryList = async (req, res) => {
    try {
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({
                error: 'User ID not specified'
            });
        }

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                error: 'Product ID not specified'
            });
        }

        const findUser = await UserModel.findById(userId);
        
        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const findUserHistoryIndex = findUser.history.findIndex(product => product._id.toString() === id);

        if (findUserHistoryIndex === -1) {
            return res.status(404).json({
                error: 'The specified identifier was not found in the array'
            });
        }

        findUser.history.splice(findUserHistoryIndex, 1);

        await findUser.save();

        res.status(200).json({
            removedId: id,
            message: 'The identifier was successfully removed from the history'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: 'Server error'
        });
    }
}

export const getHistoryList = async (req, res) => {
    try {
        const userId = req.userId;
        const {products, pages} = req.query

        if (!userId) {
            return res.status(401).json({
                error: 'User ID not specified'
            });
        }

        const findUser = await UserModel.findById(userId);
        
        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const history = findUser.history;

        function generateHistoryLine (history){
                if(history.length<20){
                    return history
                }
                const multiply = products*pages
    
                if(multiply >= history.length){
                    return []
                }
    
                const restProducts = history.length - multiply
                if(restProducts <= products && restProducts>=0){
                    const recommendations = history.splice(multiply, restProducts)
                    return recommendations
                }
    
                if(restProducts > products && restProducts>=0){
                const recommendations = history.splice(multiply, products);
                return recommendations;
            }
        }

        const historyNewList = generateHistoryLine(history)

        const historyList = await Promise.all(historyNewList.map(async (item) => {
            try {
                const product = await ProductModel.findById(item.product);
                const currentProduct = product ? product.title : "Unknown Product";
                return {...item.toObject(), title: currentProduct}; 
            } catch (error) {
                console.error("Error fetching product:", error);
                return {...item.toObject(), title: "Unknown Product"};
            }
        }));

        
        res.status(200).json({ 
            historyList
        });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({
            error: 'Server error'
        });
    }
}