
import { User } from '../models/user.models.js';
import bcrypt from "bcrypt"


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

export const signup = async (req, res) => {
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
}


export const login = async (req, res) => {
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
};


export const logout= async(req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: undefined}}, {new: true})

  const options = {
    httpOnly: true,
    secure: true,
  }

  return res.status(200).clearCookie("refreshToken", options).clearCookie("accessToken", options).json({message: "Logged out successfully"})
}