const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    image : {
        data: Buffer,
        contentType: String
    },
    postType:{
        type : String,
        required : true,
    },
    eventAdditionalLink : {
        type : String
    },
    jobAdditionalLink : {
        type : String
    }
    
},
{
     timestamps: true,
}
)

module.exports= mongoose.model("Post",PostSchema);
