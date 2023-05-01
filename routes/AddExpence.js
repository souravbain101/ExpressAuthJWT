import express from 'express';
const router=express.Router();
import expenceControl from '../controller/expenceControl.js';
// ROUTE 1 : add expense using : POST "/expence/add" login required
router.post('/add',expenceControl.addExpense);
  export default router;