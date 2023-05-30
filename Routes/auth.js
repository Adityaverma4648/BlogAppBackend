const express = require("express");
const User = require("../Model/User");
const router = new express.Router();
const generateToken = require("../Config/JWT.js");


//  user controller - post data gathering-- -- -- -- -- -- -- -- -- -- -- -- -- -- 
router.post("/signUp", async (req,res)=>{
    const {userName, email, designation , password} = req.body;

    if(!userName || !email || !designation || !password){
        res.status(400);
        throw new Error("Fill all the entries!");
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(200).redirect('userError');
    }
    const user = await User.create({
        userName,
        email,
        designation,
        password,
      });
    
      if (user) {
        res.status(201).redirect('http://localhost:3000/login');
        //  redirected on login 
      } else {
        res.status(400).send("User Not Found");
      }

});


//  Login  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/login",(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token  = generateToken(user._id);
    const userData  = await User.find({email});
    res.cookie("userDesignation" ,userData[0].designation);
    res.cookie("userName",userData[0].userName);
    res.cookie("token",token);
    res.cookie("UserEmail" , email);
    res.status(200).redirect('/');
  } else {
    res.status(400).send('User Does Not Exists!');
  }
}))
