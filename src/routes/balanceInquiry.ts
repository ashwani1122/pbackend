import { Router } from "express";
import { Request, Response } from "express";
import userMiddleware from "../middleware/userMiddleware";
import Account from "../dbSchema/accountSchema";
const balanceInquiry = Router();

balanceInquiry.get("/balanceInquiry", userMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const account = await Account.findOne({userId: req.user.id}).select("balance")
    res.json({
        success: true,
        balance: account
    }) 
})
export default balanceInquiry