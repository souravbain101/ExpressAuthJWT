import Expense from "../models/ExpenseSchema.js";
class expenceControl {
  static addExpense = async (req, res) => {
    try {
      const { category, date, currency, amount } = req.body;
      const newData = new Expense({ user: req.user.id, category, date, currency, amount });
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
}
export default expenceControl;
