const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    job_title:{
        type:String,
        required:true,
    },
    job_company:{
        type:String,
        required:true,
    },
    job_experience:{
        type:String,
        required:true,
    },
    job_salary:{
        type:String,
        required:true,
    },
    job_description:{
        type:String,
        required:true,
    },
},
{timestamps:true});

module.exports = mongoose.model("job" , jobSchema)