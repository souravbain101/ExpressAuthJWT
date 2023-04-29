import express from 'express';
const router=express.Router();
import Expense from '../models/ExpenseSchema.js';
import CheckUserauth from '../middlewares/Auth_middleware.js'

// ROUTE 1 : add expense using : POST "/expence/add" login required
router.post("/add",CheckUserauth,async (req, res) => {
      try {
        const { category, date, currency,amount } = req.body;
        const expense = new Expense({category, date, currency,amount});
        const savedexpense = await expense.save();
        res.json(savedexpense);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Error occured server");
      }
    }
  );
  export default router;