import mongoose from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type:String,
        required: true,
    },
    products: [
        {
            productName:{
                type:String,
                required:true,
                trim:true,
            },
            category:{
                type:String,
                required:true,
                trim:true,
            },
            defaultValue:{
                type:Number,
                required:true,
            }
        }
    ],
    //only storing id and not full object
    bills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bill"
    }],
    refreshToken: {
        type: String
    }
}, {timestamps:true})

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRY})
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema)