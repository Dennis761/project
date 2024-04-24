import UserModel from '../Models/UserModel.js'
import ProductModel from '../Models/ProductModel.js'
import { validationResult } from 'express-validator'
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: 'Validation failed',
                errors: errors.array()
        })
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10)
    const Hash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country,
        passwordHash: Hash,
        avatarURL: req.body.avatarURL,
    })

    const user = await doc.save();

        const token = jwt.sign({
            _id: user._id
        }, 'secret-code', {
            expiresIn: '30d'
        });

        const {passwordHash, ...userData} = user._doc

        res.status(200).json({
            ...userData, 
            token
        })
    } catch (error){
    console.error(error)
    res.status(500).json({
        success: 'Failed to register'
    })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})

        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isAvailable = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if(!isAvailable){
            return res.status(403).json({
                message: 'Invalid login or password'
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'user-secret-code', {
            expiresIn: '1h'
        });

        const {passwordHash, ...userData} = user._doc
        
        res.status(200).json({
            ...userData, 
            token
        })

    } catch (error) {
        res.status(500).json({
            success: 'Server error'
        })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userToken = req.params.userToken;

        
        const decoded = jwt.verify(userToken, 'user-secret-code');

        if (!decoded) {
            return res.status(400).json({
                error: 'Invalid user token'
            });
        }

        const user = await UserModel.findById(decoded);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const { name, email, country, products, avatarURL } = user;

        const foundProducts = await Promise.all(products.map(async productId => {
            return await ProductModel.findById(productId);
        }));

        const userInfo = { name, email, country, avatarURL };

        return res.status(200).json({
                userInfo,
                foundProducts
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

export const editProfile = async (req, res) => {
    try {
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

        const { name, email, country, avatarURL } = req.body;

        const updates = {};

        if (name !== undefined && name !== '') {
            updates.name = name;
        }

        if (email !== undefined && email !== '') {
            updates.email = email;
        }

        if (country !== undefined && country !== '') {
            updates.country = country;
        }

        if (avatarURL !== undefined && avatarURL !== '') {
            updates.avatarURL = avatarURL;
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: updates },
            { new: true }
        );

        // Assuming you have 'date' defined somewhere
        const date = new Date();
        user.history.unshift({ action: 'You have edited your profile', date: date });

        await user.save();

        if (!updatedUser) {
            return res.status(404).json({ 
                error: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message // Return the actual error message
        });
    }
};