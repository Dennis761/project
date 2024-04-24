import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    aboutProduct: {
        type: String,
        required: true
    },
    viewsCount: {
        type: Number,
        default: 0,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageURL: {
        type: String,
        required: true,
    },
    rating: {
        total: {
            type: Number,
            default: 0
        },
        count: {
            type: Array,
            default: []
        },
        average: {
            type: Number,
            default: 0
        }
    },
    saved: {
        type: Array,
        default: []
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Product', ProductSchema);