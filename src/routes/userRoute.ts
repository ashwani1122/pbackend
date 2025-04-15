import dotenv from "dotenv";
dotenv.config();
import { Router } from "express"
import { Request, Response } from "express"
import  zod from  "zod"
import jwt from "jsonwebtoken"
import User from "../dbSchema/userSchema"
import Account from "../dbSchema/accountSchema"
import { JWT_SECRET } from "../config";
const userRouter = Router();
userRouter.post("/signup" ,async (req: Request, res: Response) : Promise<void> => { 
    console.log("hi there");
    const body = req.body
    console.log(body);
    const user = zod.object({
        firstName: zod.string(),
        lastName: zod.string(),
        email: zod.string().email(),
        password: zod.string().min(8)
    })
    const userData = user.safeParse(body)
    if(userData.success){ 
        
        const newUser = new User(userData.data)
        console.log(newUser);
        await newUser.save()
        console.log(newUser);
        res.status(201).json({
            Message: "User created successfully",
            success: true
        })
    }
    else{
        res.status(400).json({
            Message: "Invalid data",
            success: false
        })
    }
})
userRouter.post("/signin", async (req: Request, res: Response) => {
    const body = req.body;
    const usersignin = zod.object({
        email : zod.string(),
        password: zod.string().min(8)
    }) 
    const { success } = usersignin.safeParse(body);
    try {
        if(success){
        
        const user = await User.findOne({email: body.email})
        const userId = user?._id
        //@ts-ignore
        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })
        if(user){
            const token = jwt.sign({
                id: user._id,
            },JWT_SECRET)
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                token
            })
        }
        else{
            res.status(400).json({
                success: false,
                message: "User not found"
            })
        } 
    }
    }
    catch (error) {
        console.log(error)
    }
})

export default userRouter