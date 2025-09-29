import connectDB from './db/connection.js';
import dotenv from "dotenv";
import express from "express";
import { User } from './models/user.models.js';
import bcrypt from "bcrypt"
import cookieParser from 'cookie-parser';
import { verifyjwt } from './middlewares/auth.middleware.js';
import { access } from 'fs';

dotenv.config({
  path: 'C:\\Users\\Harsh\\Desktop\\VANDRE-25\\Backend\\.env'
})

const generateAccessAndRefreshTokens = async (user) => {
  try {
    console.log("started generating cookies")
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateAccessToken()
    user.refreshToken = refreshToken
    console.log(accessToken, refreshToken)
    await user.save({validateBeforeSave: false})
    return {accessToken, refreshToken}
  } catch (error) {
    throw new Error(500, "Token Generation Failed");
  }
}

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000;
app.use(cookieParser())

await connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup', async (req, res) => {
  try
  {const { name, email, password } = req.body;
  const existingUser = await User.findOne({email});
  if(existingUser)
  {
    return res.status(400).json({message: "User already exists!"})
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword});
  await newUser.save();
  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(newUser)
  console.log({accessToken, refreshToken})
  const loggedInUser = await User.findById(newUser._id).select("-password")

  const options = {
    httpOnly: true,
    secure: true,
  }

  res.status(200).cookie("refreshToken", refreshToken, options).cookie("accessToken", accessToken, options).json({message: "User Authenticated", user: loggedInUser})}
  catch(error)
  {
    console.error(error)
    res.status(500).json({message: "Internal server error!"});
  }
});

app.post('/login', async (req, res) => {
  try
  {const { email, password } = req.body;
  const currentUser = await User.findOne({email});
  if(!currentUser)
  {
    return res.status(401).json({message: "Invalid credentials"})
  }
  const isMatch = await bcrypt.compare(password, currentUser.password)
  if (isMatch)
  {
    const{accessToken, refreshToken} = await generateAccessAndRefreshTokens(currentUser)

    const loggedInUser = await User.findById(currentUser._id).select("-password")

    const options = {
      httpOnly: true,
      secure: true,
    }

    res.status(200).cookie("refreshToken", refreshToken, options).cookie("accessToken", accessToken, options).json({message: "User Authenticated", user: loggedInUser})
  }
  else{
    return res.status(401).json({message: "Invalid credentials"})
  }
}
  catch(error)
  {
    console.error(error)
    res.status(500).json({message: "Internal server error!"});
  }
});

app.post('/billing', verifyjwt, async (req, res) => {
  
})

app.post("/getbills", verifyjwt, async (req, res) => 
{

})

app.post("/addproducts", verifyjwt, async (req, res) =>
{
  const products = req.body.products;
  if(!products || !Array.isArray(products) || products.length === 0)
  {
    return res.status(400).json({message: "Products are required and should be an array"})
  }
  console.log("user:", req.user._id)
  const currentUser = await User.findById(req.user._id)
  console.log("before user:",currentUser)
  if(!Array.isArray(currentUser.products))
  {
    currentUser.products = products
  }
  if(currentUser.products.length==0)
  {
    currentUser.products = products
  }
  else
  {
    for(const i of products)
  {
    if(!currentUser.products?.includes(i))
    {
      currentUser.products.push(i)
    }
  }
  }
  currentUser.products = [...new Set([...currentUser.products, ...products])]
  await currentUser.save()
  console.log("after user:", currentUser)
  return res.status(200).json({message: "Products added successfully", products: currentUser.products})
})

app.post('/logout', verifyjwt, async(req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined}}, {new: true})

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res.status(200).clearCookie("refreshToken", options).clearCookie("accessToken", options).json({message: "Logged out successfully"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}\n http://localhost:${port}`)
})