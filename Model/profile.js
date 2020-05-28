const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    profile_photo:{
        type:[""],
        required:true,
    },
    profile_name:{
        type:String,
        required:true,
    },
    profile_email:{
        type:String,
        required:true,
    },
    profile_contact:{
        type:String,
        required:true,
    },
    profile_location:{
        type:String,
        required:true,
    },
    profile_gender:{
        type:String,
        required:true,
        enum: ["male" , "female"]
    },
    profile_education:{
        type:[""],
        required:true,
    },
    profile_specilization:{
        type:[""],
        required:true,
    },
    profile_university:{
        type:String,
        required:true,
    },
    profile_coursetype:{
        type:String,
        required:true,
        enum: ["full time" , "part time" , "correspondance/distance learning"],
    },
    profile_yop:{
        type:[""],
        required:true,
    },
    profile_marks:{
        type:String,
        required:true,

    },
    profile_skills:{
        type:String,
        required:true,
    },
    user: {
        type:String,
        required:true,
          },
    
    
},
{timestamp:true});

module.exports = mongoose.model("profile" , profileSchema);