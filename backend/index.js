import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors"

dotenv.config({
    path:".env"
})
databaseConnection();
const app = express();


//middlewares
app.use(express.urlencoded({
    extended:true
}));
app.use(express.json())
app.use(cookieParser())

const corsOptions = {
    origin:"https://twitterproj-frontend.onrender.com",
    credentials:true
}

app.use(cors(corsOptions));

//route

app.use("/api/v1/user", userRoute)
app.use("/api/v1/tweet", tweetRoute)

app.get("/home", (req, res)=>{
    res.status(200).json({
        message:"Comming from backend..."
    })
})

app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server listen at port ${process.env.PORT}`)
})