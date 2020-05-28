const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//ipmort mongoose
require("../Model/jobs");
const Job = mongoose.model("job");


//add-jobs
router.get("/add-jobs" , (req , res)=>{
    res.render("./jobs/add-jobs");
});

router.post("/create-jobs" , (req , res)=>{
    let newJob ={
        job_title:req.body.job_title,
        job_company:req.body.job_company,
        job_experience:req.body.job_experience,
        job_salary:req.body.job_salary,
        job_description:req.body.job_description

    };
    new Job(newJob).save().then((job)=>{
        res.redirect("./personal/Profile" , 304 , {job:job});
    }).catch((err)=>console.log(err));
});

module.exports = router;