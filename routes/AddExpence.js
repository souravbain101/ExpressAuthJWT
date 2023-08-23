import express from 'express';
const router=express.Router();
import expenceControl from '../controller/expenceControl.js';
import CheckUserauth from '../middlewares/Auth_middleware.js'

router.use(CheckUserauth);

// ROUTE 1 : add expense using : POST "/expence/add" login required
router.post('/add',expenceControl.addExpense);
// ROUTE 2 : GET all notes using : GET "/api/notes/fetchallnotes" login required
router.get("/fetchedata", expenceControl.fetchExpences);
router.get("/fetchdashdata", expenceControl.fetchdashdata);
router.get("/Fetchlastmonthdata", expenceControl.Fetchlastmonthdata);
router.get("/FetchTransaction", expenceControl.FetchTransaction);

// ROUTE 3 : detele expence using : DELETE "/expence/delete" login required
router.delete("/delete/:id",expenceControl.deleteExpensedata);

// ROUTE 4 : detele expence using : DELETE "/expence/edit/${id}" login required
router.put("/edit/:id",expenceControl.editExpensedata);

  export default router;