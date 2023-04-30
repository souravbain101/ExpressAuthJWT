import Expense from '../models/ExpenseSchema.js';
class expenceControl{
    static addExpense = async (req, res) => {
        try {
          const { category, date, currency, amount } = req.body;
        const newData = new Expense({category, date,currency,amount });
        // console.log(req);
        const savedData = await newData.save();
        console.log(savedData)
        res.send({ status: "success", message: "added your data" })
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Login" });
        }
      };
}
export default expenceControl;