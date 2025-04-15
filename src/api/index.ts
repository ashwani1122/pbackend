import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import userRouter from "../routes/userRoute";
import accountRouter from "../routes/accountRouter";
import usersRouter from "../routes/usersRouter";
import balanceInquiry from "../routes/balanceInquiry";
import transferMoney from "../routes/transferMoney";  
import mongoose from "mongoose";
import cors from "cors";
import e from 'express';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/account", accountRouter);
app.use("/api/v1/user", usersRouter); 
app.use("/api/v1/user", balanceInquiry);
app.use("/api/v1/user", transferMoney);
const PORT = process.env.PORT;
const mongo_url = process.env.MONGO_URI as string;
console.log(mongo_url);
console.log(PORT);
console.log(process.env.JWT_SECRET);
console.log(process.env.MONGO_URI);
app.use(express.json());
async function main(){
    await mongoose.connect(mongo_url as string, {
    }).then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
}
main();

export default app;