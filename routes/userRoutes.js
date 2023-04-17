import express from 'express';
const router=express.Router();
import UserControler from '../controller/userController.js';
import CheckUserauth from '../middlewares/Auth_middleware.js'


//Route level middleware to protect route
router.use('/changepassword',CheckUserauth);
router.use('/loggeduser',CheckUserauth);

//Public Routes

router.post('/register',UserControler.UserRegistration);
router.post('/login',UserControler.userLogin);
router.post('/send-reset-password',UserControler.SendUserResetPassword);
router.post('/reset-password/:id/:token',UserControler.UserPasswordReset);



//Private Routes

router.post('/changepassword',UserControler.Changepassword);
router.get('/loggeduser',UserControler.LoggedUser);
router.get('/refresh_token',UserControler.refresh_token)
 



export default router;