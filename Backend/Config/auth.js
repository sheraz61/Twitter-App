import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:"../config/.env"
});
const isAuthenticated= async (req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token) {

            return res.status(401).json({
                message:"User not authenticated.",
                success:false
            });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
            if(!decode) {
                return res.status(401).json({
                    message: "Invalid token, please login again",
                    success: false
                });
            }
            req.user = decode.userId;
            next();
    } catch (error) {
         res.status(500).json({
            message:error.message,
            success:false
         })
    }
}

export default isAuthenticated;