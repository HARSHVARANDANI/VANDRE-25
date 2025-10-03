import connectDB from './db/connection.js';
import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import cors from "cors";
dotenv.config({
  path: './.env'
})



const app = express()
app.use(express.json())
app.use(cors({
  origin:"http://localhost:8080",
  credentials:true,
}))

app.use(cookieParser())
app.use("/users",userRouter)
const port = process.env.PORT || 3000;


await connectDB()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}\n http://localhost:${port}`)
})