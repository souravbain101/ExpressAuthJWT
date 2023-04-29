import {Schema,model} from "mongoose";

const Expense = new Schema({
  category: {type:String,required:true},
  date: {type: Date,required:true},
  currency: {type:String,required:true},
  amount: {type:Number,required:true},
});
export default model("expenses", Expense);
//   model_name , schema function
