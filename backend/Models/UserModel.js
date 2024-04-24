import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    saved: {
        type: Array,
        default: []
    },
    rated: {
        type: Array,
        default: []
    },
    purchases: {
        type: Array,
        default: []
    },
    products: {
        type: Array,
        default: []
    },
    history: [{
        action: {
            type: String,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    country: {
        type: String,
        default: 'International'
    },
    passwordHash: {
        type: String,
        required: true,
    },
    avatarURL: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7wrKjpbjvQzLHlQfvKO8gsopOJBvbCEXe1A&usqp=CAU'
    }
});

export default mongoose.model('User', UserSchema);
