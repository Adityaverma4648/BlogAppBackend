const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
    groupName : {
        type : String,
        required : true,
    },
    groupAdmin : {
        type : String,
        required : true,
        unique : true,
    },
    groupSize : {
        type : Number,
        required : true,
    },
    groupMembers : [{userName : String , email : String }]
    
},
{
     timestamps: true,
}
)

module.exports= mongoose.model("Group",GroupSchema);