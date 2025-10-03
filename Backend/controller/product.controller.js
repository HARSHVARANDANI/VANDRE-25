import { User } from "../models/user.models.js";
export const addproducts = async (req, res) =>
{
  console.log("Came to add product",req.body);
  try {
    const { id, name, category, defaultPrice } = req.body;
    console.log("id iis",id);
    console.log("name iis",name);
    console.log("category iis",category);
    console.log("product iis",defaultPrice);

    // transform into schema-compliant JSON
    const productData = {
      productName: name,       // map name → productName
      category,                // keep same
      defaultValue: defaultPrice // map defaultPrice → defaultValue
    };
    if (!productData.productName || !productData.category || !productData.defaultValue) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    console.log("user:", req.user._id)
    const currentUser = await User.findById(req.user._id)
    console.log("before user:",currentUser)
    currentUser.products.push(productData);
    await currentUser.save();
    
    return res.status(200).json({message: "Products added successfully", products: currentUser.products})

  } catch (error) {
    return res.status(500).json({message:"Error in Adding Product",err:error.message});
  }
}


export const listAllProducts = async(req,res) =>
{
    console.log("Came to fetch all products");
    try {
    
    console.log("user:", req.user._id)
    const currentUser = await User.findById(req.user._id)
    console.log("before user:",currentUser)
    
    
    return res.status(200).json(currentUser.products)

  } catch (error) {
    return res.status(500).json({message:"Unable to Fetch All Products",error});
  }
}