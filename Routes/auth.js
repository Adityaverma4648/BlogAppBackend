const express = require("express");
const User = require("../Model/User");
const router = express.Router();
const generateToken = require("../Config/JWT.js");


//  user controller - post data gathering-- -- -- -- -- -- -- -- -- -- -- -- -- -- 
router.post("/signUp", async (req,res)=>{
    const {userName, userEmail , password} = req.body;

    if(!userName || !userEmail || !password){
        res.status(400);
        throw new Error("Fill all the entries!");
    }
    const userExists = await User.findOne({ userEmail });

    if (userExists) {
      res.status(200).redirect('userError');
    }
    const user = await User.create({
        userName,
        userEmail,
        password,
      });
    
      if (user) {
        res.status(201).redirect("http://localhost:3000/login")
        //  redirected on login 
      } else {
        res.status(400).send("User Not Found");
      }

});


//  Login  ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post("/login",(async (req, res) => {
  const { userEmail, password } = req.body;
  const user = await User.findOne({ userEmail });
  if (user && (await user.matchPassword(password))) {
    const token  = generateToken(user._id);
    const userData  = await User.find({userEmail});
    res.cookie("userDesignation" ,userData[0].designation);
    res.cookie("userName",userData[0].userName);
    res.cookie("token",token);
    res.cookie("UserEmail" , userEmail);
    res.status(200).redirect("http://localhost:3000/")
  } else {
    res.status(400).send('User Does Not Exists!');
  }
}))


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('UserEmail');
  res.clearCookie('userName');
  res.clearCookie('companyEmail');
  return res.redirect('http://localhost:3000');
});

module.exports = router;