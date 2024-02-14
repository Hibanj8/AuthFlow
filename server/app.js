import express from "express";
import db from './models/index.js';
import cors from "cors";
import roleRoute from './routes/role.route.js';
import userRoute from './routes/user.route.js';
import cookieParser from 'cookie-parser';

const app = express(); 
const PORT = 8000; 

app.use(cookieParser());
app.use(express.json());
app.use(cors()); 
app.use('/role', roleRoute);
app.use('/user', userRoute);

const connectionString = db.url;
console.log(connectionString);  

const startserver = async () =>{
  try{ 
    await db.mongoose.connect(connectionString, {});
    console.log("Connection to the database successful");  
    app.listen(PORT,()=>{
      console.log("http://localhost:"+PORT);   
    })  
  }catch(error){
    console.log(error.message);
  }
} 

startserver();
