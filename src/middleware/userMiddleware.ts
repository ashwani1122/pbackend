import jwt from "jsonwebtoken";
import  { JWT_SECRET }  from "../config";
import { NextFunction, Response, Request } from "express";
export default function userMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
            if (!token) {
                res.status(401).json({
                    success: false,
                    message: "No token provided"
                });
                return;
            }   
            else{   
            const tokenPayload = jwt.verify(token,  JWT_SECRET);
            console.log(tokenPayload);
                if (tokenPayload) {
                    //@ts-ignore
                    req.user = tokenPayload;
                    next();
                } else {
                res.status(401).json({
                    success: false,
                    message: "Invalid token"
                });
            }   
        }
}
