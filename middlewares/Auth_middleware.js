import  jwt  from "jsonwebtoken";
import usermodel from "../models/UserSchema.js";

const CheckUserauth=async(req,res,next)=>{
    let token
    const {authorization}=req.headers
    console.log(authorization)

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token=authorization.split(' ')[1];
            

            //verify token
            
            const {userID}=jwt.verify(token,process.env.jwt_Secret);
           
            
            if (!userID) {
                
                res.status(401).send({'status':'invalid token','message':'token is expired'});
            }

            //get user from token
            req.user=await usermodel.findById(userID).select('-password')
            
            next();

        } catch (error) {
            res.status(401).send({'status':'failed','message':'unauthorized user'});
        }
    }
    if (!token) {
        res.status(401).send({'status':'failed','message':'unauthorized user,No token'});
    }
}

export default CheckUserauth;
