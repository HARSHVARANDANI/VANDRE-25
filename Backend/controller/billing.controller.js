

// Expecting Input in this format 
// {
//   "customerName": "Aryan Jain",
//   "products": [
//     { "productName": "Notebook", "quantity": 5, "finalPrice": 250 },
//     { "productName": "Pen", "quantity": 10, "finalPrice": 100 }
//   ]
// }



import { Bill } from "../models/bill.models.js";
import { User } from "../models/user.models.js";

export const createBill =  async (req,res)=>
{
    try {
        const {customerName,products}=req.body;

        //handle these cases in frontend
        if(!products || !Array.isArray(products) || products.length === 0)
        {
            return res.status(400).json({message: "Kindly select some product!!"})
        }
        if(!customerName)
        {
            return res.status(400).json({message:"Customer name is required!!"})
        }

        const newBill = new Bill({
            customerName,products
        })
        await newBill.save();

        const user=req.user;
        // user.bills.push(newBill._id);
        // await user.save();
        //OR
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $push:{
                    bills:newBill._id
                }
            },
            {
                new:true
            }
            
        )
        return res.status(201).json(newBill);
    } catch (err) {
        return res.status(500).json({error:err.message})
    }
}


export const getAllBills = async(req,res)=>
{
    try {
        // const user = await User.aggregate([
        // {
        //     $match:{
        //         // _id:req.user._id, this wont match as id needs to be of type object id
        //         _id: new mongoose.Types.ObjectId(req.user._id)
        //     }
        // },
        // {
        //     $lookup:{
        //         from:"bills",
        //         localField:"bills",
        //         foreignField:"_id",
        //         as:"Bills"
        //     }
        // },
        // {
        //     $project:
        //     {
        //         name:1,
        //         Bills:1,
        //     }
        // }
        // ])
        // return res.status(201).json(user);

        //better than this is 
        const user = await User.findById(req.user._id).populate("bills").select("name bills")
        return res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}