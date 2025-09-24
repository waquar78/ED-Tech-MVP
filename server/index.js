import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import userRoutes from "./routes/userRoute.js"
import contentRoutes from "./routes/contentRoute.js"
import lessonRoutes from "./routes/lessonRoute.js"
import searchRoutes from "./routes/searchRoute.js"
import essayRoutes from "./routes/essayRoute.js"
import cors from "cors"


const app= express()
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: '*'
}))
connectDb()

const port= process.env.PORT || 8080

// Routes
app.use("/api/v1/users",userRoutes)
 app.use("/api/v1/content",contentRoutes)
app.use("/api/v1/lessons",lessonRoutes)
app.use("/api/v1/search",searchRoutes)
 app.use("/api/v1/essays",essayRoutes)


app. listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})

