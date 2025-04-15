import express from "express";
import userRouter from "./routes/userRoute";
import accountRouter from "./routes/accountRouter";
import usersRouter from "./routes/usersRouter";
import balanceInquiry from "./routes/balanceInquiry";
import transferMoney from "./routes/transferMoney";  
import mongoose from "mongoose";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/account", accountRouter);
app.use("/api/v1/user", usersRouter); 
app.use("/api/v1/user", balanceInquiry);
app.use("/api/v1/user", transferMoney);
async function main(){
    await mongoose.connect("mongodb+srv://ashwanisingh:elVZUtternK9kiNa@cluster0.vk9uv.mongodb.net/paytmdb").then(() => {
        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        })
    })
}
main();