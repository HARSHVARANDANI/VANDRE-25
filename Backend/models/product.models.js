import mongoose, { Mongoose } from "mongoose"

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        lowercase: true,
    },

}, {timestamps: true})



export const Product = mongoose.model("Product", productSchema)