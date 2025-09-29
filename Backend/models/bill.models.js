import { timeStamp } from "console"
import mongoose from "mongoose"

const billSchema = new mongoose.Schema({
    
}, {timestamps: true})

export const Bill = mongoose.model("Bill", billSchema)