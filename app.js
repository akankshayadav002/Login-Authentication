import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
dotenv.config()

const app=express()
const port=process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL

app.use(cors())


connectDB(DATABASE_URL)
app.use(express.json())

app.use("/api/user",userRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})

