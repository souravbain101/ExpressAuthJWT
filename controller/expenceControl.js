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
      const date=new Date();
        const arr=[]
        let i=1;
        for (let index = i; index <=12; index++) {
          date.setMonth(index);
          let test=await Expense.find({month:index});
          let obj={"name":date.toLocaleString('en-US',{month:'short'}),"Food & Drinks":0,"Rents":0,"Entertainment":0};

          test.map((v)=>{
            
            // obj['name']=date.toLocaleString('en-US',{month:'short'});
            obj[v.category]=obj[v.category]+v.amount;
          })
          arr.push(obj);
        
          
        }
        // console.log(arr);
        
      // const datas = await Expense.find({ user: req.user.id });
      res.json(arr);
      

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Error occured server");
    }
  };
}


export default expenceControl;


