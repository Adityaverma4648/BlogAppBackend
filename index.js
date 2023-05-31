require("dotenv").config();
const express = require("express");
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/auth');
const blogRoutes = require("./Routes/blogRoutes");

const app = express();
app.use(express.json()); // to accept json data
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// DB connect 
const connectDB = require("./Config/database");
// PORT decision
const PORT = process.env.PORT||7000;
 


app.use("/auth",authRoutes);

app.use("/blog",blogRoutes);

const start = async ()=>{
    try {
        await connectDB(process.env.MONGODB_URI);
       app.listen(PORT,console.log(`SERVER STARTED AT ${PORT}`));
    } catch (error) {
        console.log(`Connection failed : ${error}`)
    }
 }
 start();
 