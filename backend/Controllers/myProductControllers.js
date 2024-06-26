import ProductModel from '../Models/ProductModel.js'
import UserModel from '../Models/UserModel.js'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose'

export const createMyProduct = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

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

        const newProduct = new ProductModel({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            aboutProduct: req.body.aboutProduct,
            imageURL: req.body.imageURL,
            creator: userId,
            location: req.body.location,
            country: req.body.country,
            price: req.body.price
        });

        const product = await newProduct.save();

        user.history.unshift({
            action: 'Created product',
            product: product._id,
            date: new Date()
        });

        user.products.push(product._id);

        await user.save();

        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

export const showMyProducts = async (req, res) => {
    try {
        const userId = req.userId;

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

        const findProductPromises = findUser.products.map( id => ProductModel.findById(id));

        if(!findProductPromises){
            return res.status(404).json({
                error: 'Products not found'
            });
        }

        const foundProducts = await Promise.all(findProductPromises);

        res.status(200).json({
            foundProducts,
            message: 'Your products'
        });
    } catch (error) {
        return res.status(500).json({
            error: 'Server not found'
        });
    }
}

export const editMyProduct = async (req, res) => {
    try {
        const productById = req.params.id;
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({
                error: 'User ID not specified'
            });
        }
  
        const date = new Date()

        const { description, aboutProduct, imageURL, country, location, price } = req.body;

        const updates = {};

        if (description !== undefined && description !== '') {
            updates.description = description;
        }

        if (aboutProduct !== undefined && aboutProduct !== '') {
            updates.aboutProduct = aboutProduct;
        }

        if (imageURL !== undefined && imageURL !== '') {
            updates.imageURL = imageURL;
        }

        if (country !== undefined && country !== '') {
            updates.country = country;
        }

        if (location !== undefined && location !== '') {
            updates.location = location;
        }

        if (price !== undefined && price !== '') {
            updates.price = price;
        }

        const updatedProduct = await ProductModel.findOneAndUpdate(
            { _id: productById },
            { $set: updates },
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(403).json({
                error: 'Product not updated'
            });
        }

        const findUser = await UserModel.findById(userId)

        if (!findUser) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        findUser.history.unshift({action: 'Updated product', product: productById, date: date})

        await findUser.save()

        res.status(200).json({
            updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

export const deleteMyProduct = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                error: 'User ID not specified'
            });
        }

        const { id } = req.params;

        const findProduct = await ProductModel.findById(id);

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

        const productIndex = findUser.products.indexOf(id);

        if (productIndex === -1) {
            return res.status(404).json({
                error: 'Product does not exist in user products'
            });
        }
 
        await UserModel.updateMany(
            { "rated.product": id },
            { $pull: { rated: { product: id } } });

        await UserModel.updateMany(
            { "saved.product": id }, 
            { $pull: { saved: { product: id } } });

        findUser.products.splice(productIndex, 1);

        await findUser.save();

        await ProductModel.findByIdAndDelete(id);

        res.status(200).json({
            removedId: id,
            message: 'Product successfully removed'
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};