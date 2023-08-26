import mongoose from 'mongoose';


const userschema=new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true},
    
})

const usermodel=mongoose.model('usermodel',userschema);

export default usermodel;