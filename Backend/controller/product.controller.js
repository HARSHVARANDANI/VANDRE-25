import { User } from "../models/user.models.js";
import { Product } from "../models/product.models.js";
export const addproducts = async (req, res) =>
{
  try {
    const {productName,category,defaultValue} = req.body;
    if(!productName || !category || !price)
    {
      return res.status(400).json({message: "All fields are required!"})
    }
    console.log("user:", req.user._id)
    const currentUser = await User.findById(req.user._id)
    console.log("before user:",currentUser)
    const newProduct = new Product({
      productName,
      category,
      defaultValue
    }) 

    currentUser.products.push(newProduct);
    await currentUser.save();
    
    return res.status(200).json({message: "Products added successfully", products: currentUser.products})

  } catch (error) {
    return res.status(500).json({message:"Error in Adding Product",error});
  }
}


export const listAllProducts = async(req,res) =>
{
    try {
    
    console.log("user:", req.user._id)
    const currentUser = await User.findById(req.user._id)
    console.log("before user:",currentUser)
    
    
    return res.status(200).json(currentUser.products)

  } catch (error) {
    return res.status(500).json({message:"Unable to Fetch All Products",error});
  }
}