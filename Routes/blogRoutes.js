const express = require("express");
//  MongoSchema
const Post = require("../Model/Post");
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage });
 


router.post('/create',upload.single('image'),async (req,res)=>{
    console.log(req.body);
    const {title, description , image , postType , jobAdditionalLink , eventAdditionalLink} = req.body;

    if(!title || !description || !image  || !postType ){
        res.status(400);
        throw new Error("Fill all the entries!");
    }
   
    const post = await Post.create({
        title,
        description,
        image,
        postType,
        eventAdditionalLink, 
        jobAdditionalLink
      });
    
      if (post) {
        res.status(201).redirect("http://localhost:3000/")
        //  redirected on login 
      } else {
        res.status(400).send("CouldNot Create Post");
      }
})

module.exports = router;