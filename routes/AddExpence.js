import express from 'express';
const router=express.Router();
import expenceControl from '../controller/expenceControl.js';
import CheckUserauth from '../middlewares/Auth_middleware.js'

router.use(CheckUserauth);

// ROUTE 1 : add expense using : POST "/expence/add" login required
router.post('/add',expenceControl.addExpense);
// ROUTE 1 : GET all notes using : GET "/api/notes/fetchallnotes" login required
router.get("/fetchedata", expenceControl.fetchExpences);
  export default router;