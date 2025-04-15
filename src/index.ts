import express from "express";
import userRouter from "./routes/userRoute";
import accountRouter from "./routes/accountRouter";
import usersRouter from "./routes/usersRouter";
import balanceInquiry from "./routes/balanceInquiry";
import transferMoney from "./routes/transferMoney";  
import mongoose from "mongoose";
import { MONGO_URI, PORT } from "./config";
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
    await mongoose.connect(MONGO_URI).then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
}
main();