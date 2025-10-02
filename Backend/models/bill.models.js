import mongoose from "mongoose"
import { Counter } from "./counter.models.js";


const billSchema= new mongoose.Schema({

    billId:{
        type: Number,
        unique:true,
        index:true,
        required:true,
    },

    customerName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    products : [
        {
            productName:{
                type:String,
                required:true,
                lowercase:true,
                trim:true
            
            },
            quantity:{
                type:Number,
                required:true,
            },
            finalPrice:{
                type:Number,
                required:true,
            }
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
        default:0
    }

},{
    timestamps:true
})

// dont use arrow fucntions over here use normal fucntions
//otherwise you wont be able to use this it would be undefined
billSchema.pre("save",async function(next)
{
    this.totalPrice=this.products.reduce((sum,p)=> sum+p.finalPrice,0);

    if(this.isNew)
    {
        // if its a new bill;
        const counter = await Counter.findByIdAndUpdate(
            {
                _id:"billid"
            },
            {
                $inc:{
                    seq:1,
                }
            },
            {
                new:true,//gives you back the updated document otherwise the previos non updated one
                upsert:true //update if already exist or insert
            }
        )
        this.billId=counter.seq;    
    }
    next();
})
export const Bill = mongoose.model("Bill", billSchema)