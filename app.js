import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/connectdb.js';
import router from './routes/userRoutes.js';
import expence from './routes/AddExpence.js'
import bodyparser from 'body-parser';

const app=express();
app.use(bodyparser.json({extended:true}));
app.use(bodyparser.urlencoded({extended:true}));
const port=process.env.PORT;
const DATABASE_URL=process.env.dbURL;
//CORS POLICY
app.use(cors());
//CONNECT DB
connectDB(DATABASE_URL);

//JSON
app.use(express.json());

app.use('/',router);
app.use('/expence',expence)



app.listen(port,()=>{
    console.log(`srver is listening at port ${port}`);
})
