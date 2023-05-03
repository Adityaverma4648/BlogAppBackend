const express = require("express");

const app = express();
const PORT = 7000;

app.get("/",(req,res)=>{
    res.send("hello World");
})


app.listen(PORT,()=>{
    console.log(`App Running On The Port : ${PORT}`);
})