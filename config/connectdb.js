import mongoose from 'mongoose';

const connectDB=async(DATABASE_URL)=>{
    try {
        const DB_options={
            dbName:"SouravDB"
        }
        await mongoose.connect(DATABASE_URL,DB_options);
        console.log("successfully connected to db");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;