import usermodel from "../models/UserSchema.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
// import { set } from 'mongoose';
import transporter from "../config/EmailConfig.js";

class UserControler {
  static UserRegistration = async (req, res) => {
    const { name, email, password, password_confirmation } = req.body;
    const user = await usermodel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email Already Exists" });
    } else {
      if (name && email && password && password_confirmation) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new usermodel({
              name: name,
              email: email,
              password: hashPassword,
              
            });
            await newUser.save();
            // const saved_user=await usermodel.findOne({email:email});
            //generate jwt token

            res.status(201).send({ status: "Success", message: "Registerd Successfully,Please Login" });
          } catch (error) {
            res.send({ status: "failed", message: "Unable to register" });
          }
        } else {
          res.send({ status: "failed", message: "password and confirm password does not match" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await usermodel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            const access_token = jwt.sign({ userID: user._id }, process.env.jwt_Secret, { expiresIn: "1h" });
            const refresh_token = jwt.sign({ userID: user._id }, process.env.jwt_Secret, { expiresIn: "1.5h" });
            res.send({ status: "Success", message: "Login Successfull,Redirecting to Dashboard", token: { access_token: access_token, refresh_token: refresh_token } });
          } else {
            res.send({ status: "failed", message: "Email or Password is not valid" });
          }
        } else {
          res.send({ status: "failed", message: "User does not exist please register" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

  static Changepassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({ status: "failed", message: "password and confirm password does not match" });
      } else {
        //salt and hash
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = await req.user;
        await usermodel.findByIdAndUpdate(user._id, { $set: { password: hashPassword } });
        res.send({ status: "success", message: "Changed password successfully" });
      }
    } else {
      res.send({ status: "failed", message: "All fields are required" });
    }
  };

  static LoggedUser = async (req, res) => {
    const user = await req.user;
    res.send({ user: user });
  };

  static SendUserResetPassword = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await usermodel.findOne({ email: email });

      if (user) {
        const secret = user._id + process.env.jwt_Secret;
        const token = jwt.sign({ userID: user._id }, secret, { expiresIn: "10m" });
        const link = `https://backend-d5zl.onrender.com/api/user/reset/${user._id}/${token}`;
        console.log(link);
        let info = transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: user.email,
          subject: "Password Reset Link from Sourav",
          html: `<a href=${link}>Click here</a>to reset your password`,
        });

        res.send({ status: "success", message: "email sent please ... Please check your email", info: info });
      } else {
        res.send({ status: "failed", message: "User does not exist" });
      }
    } else {
      res.send({ status: "failed", message: "Email field is required" });
    }
  };

  static UserPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await usermodel.findById(id);
    const new_secret = user._id + process.env.jwt_Secret;
    try {
      jwt.verify(token, new_secret);
      if (password && password_confirmation) {
        if (password === password_confirmation) {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          await usermodel.findByIdAndUpdate(user._id, { $set: { password: hashPassword } });
          res.send({ status: "success", message: "password reset successfull.Redirecting to Home page" });
        } else {
          res.send({ status: "failed", message: "password and confirm password does not match" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Invalid token" });
    }
  };

static refresh_token=async(req,res)=>{
    console.log('api call');
    let token
    const {authorization}=req.headers
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            //get token from header
            token=authorization.split(' ')[1];
            console.log(token);
            //verify token
            const {userID}=jwt.verify(token,process.env.jwt_Secret);
            
            if (userID) {
                const access_token=jwt.sign({userID:userID},process.env.jwt_secret,{expiresIn:'1h'});
                const refresh_token=jwt.sign({userID:userID},process.env.jwt_secret,{expiresIn:'1.5h'});
                
                res.status(200).send({"status":"Success","message":"new token generated","token":{'access_token':access_token,'refresh_token':refresh_token}}) 
            }
            else{
                res.status(401).send({'message':"invalid refresh token"});
            }
        }catch (error) {
        
    }
  };
}
}
export default UserControler;
