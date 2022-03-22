import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const ProductSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURI: {
        type: String, 
        required: true,
    },
    sold: {
        type: Boolean,
        required: true,
        default: false
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyer:{
        type:mongoose.Schema.Types.ObjectId
    }
});

const Products = mongoose.model('Products', ProductSchema);

export {Products};