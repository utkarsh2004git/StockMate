import connectDB from "./config/database.js";
import express from "express"
import dotenv from "dotenv"
import shopRouter from "./routes/shopRouter.js";
import cors from "cors";
import productRouter from "./routes/productRouter.js";

dotenv.config()
connectDB();

const app = express()

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("API running successfully")
})

app.use("/api/shops",shopRouter);
app.use("/api/products",productRouter);


const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`App running on http://localhost:${PORT}`)
})
