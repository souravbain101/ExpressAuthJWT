import Expense from "../models/ExpenseSchema.js";
class expenceControl {
  static addExpense = async (req, res) => {
    try {
      const { category, date, currency, amount } = req.body;
      const month=date.split('-')[1];
      const newData = new Expense({ user: req.user.id, category, date, currency, amount,month:parseInt(month) });
      // console.log(req);

      const savedData = await newData.save();
      console.log(savedData);
      res.send({ status: "success", message: "added your data" });
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };
  static fetchExpences = async (req, res) => {
    try {
      const datas = await Expense.find({ user: req.user.id });
      res.json(datas);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured server");
    }
  };

  static fetchdashdata = async (req, res) => {
    try {

      const user=req.user._id
      
      const date=new Date();
        const arr=[]
        let i=0;
        for (let index = i; index <=11; index++) {
          date.setMonth(index);

          const test=await Expense.aggregate( [
            { $match:  {$and:[{ month: { $eq:index+1 } },{user:{$eq:user}}] } } ,
            
          ] );
          console.log(test);

          // let test=await Expense.find({month:index+1});
          let obj={"name":date.toLocaleString('en-US',{month:'short'}),"Food & Drinks":0,"Rents":0,"Entertainment":0};

          test.map((v)=>{
            
           
            obj[v.category]=obj[v.category]+v.amount;
          })
          arr.push(obj);
        
          
        }
        
      res.json(arr);
      

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured server");
    }
  };

  static Fetchlastmonthdata = async (req, res) => {
    try {

      // const datas = await Expense.find({ user: req.user.id });
      // console.log(datas);
      const user=req.user._id
      console.log(user);

      const date=new Date();
      let month=date.getMonth();
      let month1=month+1;
      let month2=month;
      let month3=month-1;
      if (month2===0) {
        month2=12;
      }
      else if(month3===0){
        month3=12;
      }
      else if(month3===-1){
        month3=11;
      }
      const arr1=[];
      const arr2=[];
      const arr3=[];

     
      const data=await Expense.aggregate( [
        { $match:  {$and:[{ month: { $gte: month3, $lte: month1 } },{user:{$eq:user}}] } } ,
        
      ] );
      
// console.log(data);
      data.map((v)=>{
        if(v.month===month1){
         arr1.push(v)
        }
        else if(v.month===month2){
          arr2.push(v);
        }
        else if(v.month===month3){
          arr3.push(v);
        }
      })

      const Grandarray=[];
      Grandarray.push(arr1);
      Grandarray.push(arr2);
      Grandarray.push(arr3);

     

      const superarray=[]
      
      Grandarray.map((val)=>{
        let obj={"name":"Food","value":0};
        let obj1={"name":"Rent","value":0};
        let obj2={"name":"Entertainment","value":0};
        let obj3={"month":0}
        let arr=[];
        val.map((v)=>{
            if(v.category==="Food & Drinks"){
          obj.value=obj.value+v.amount;
        }
       else if(v.category==="Rents"){
        obj1.value=obj1.value+v.amount;
        }
       else if(v.category==="Entertainment"){
        obj2.value=obj2.value+v.amount;
          
        }
        date.setMonth(v.month-1);
        obj3.month=date.toLocaleString('en-US',{month:'long'})
        })
        arr.push(obj)
        arr.push(obj1)
        arr.push(obj2)
        arr.push(obj3);

        superarray.push(arr);
  
      })

     

      // console.log(superarray);
        res.json(superarray);


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured server");
    }
  };
  
}


export default expenceControl;


