import connectDB from './db/connection.js';
import dotenv from "dotenv";
import express from "express";
import { User } from './models/user.models.js';
import bcrypt from "bcrypt"
import cookieParser from 'cookie-parser';
import { verifyjwt } from './middlewares/auth.middleware.js';
import userRouter from './routes/user.route.js';

dotenv.config({
  path: './.env'
})



const app = express()
app.use(express.json())
const port = process.env.PORT || 3000;
app.use(cookieParser())


app.use("/users",userRouter)

await connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})




app.post('/billing', verifyjwt, async (req, res) => {
  
})

app.post("/getbills", verifyjwt, async (req, res) => 
{

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}\n http://localhost:${port}`)
})