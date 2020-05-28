const express = require("express");
const router = express.Router();
const multer = require("multer");
const handlebars = require("handlebars");
const mongoose = require("mongoose");

//load profile Schema
require("../Model/profile");
const Profile = mongoose.model("profile");



//load storage module
const uploadLocal = require("../config/multer");
var upload = multer({ storage: uploadLocal.storage });


/*====================All get routes starts here=====================*/

router.get("/add-profile" , (req ,res )=>{
    res.render("./personal/add-profile");
})
//profile data from database
router.get("/Profile" , (req , res)=>{
    Profile.find().sort({date:"desc"})
    .lean()
    .then((profile)=>{
        res.render("./personal/Profile" , {profile:profile});
    })
    .catch((err)=>console.log(err));
});

//edit profile
router.get("/edit-profile/:id" , (req , res)=>{
    Profile.findOne({_id:req.params.id})
    .lean()
    .then((editProfile)=>{
        res.render("./personal/edit_profile" , {editProfile:editProfile});
    })
    .catch((err)=>console.log(err));
});


/*====================All get routes ends here=====================*/

/*====================All post routes starts here=====================*/

router.post("/add-profile" , upload.single("profile_photo") , (req,res)=>{
    let = {
        profile_name,
        profile_email,
        profile_contact,
        profile_location,
        profile_gender,
        profile_education,
        profile_specilization,
        profile_university,
        profile_coursetype,
        profile_marks,
        profile_skills,
        profile_yop,
    } = req.body;

    let newProfile = {
        profile_photo:req.file,
        profile_name,
        profile_email,
        profile_contact,
        profile_location,
        profile_gender,
        profile_education,
        profile_specilization,
        profile_university,
        profile_coursetype,
        profile_marks,
        profile_yop,
        profile_skills,
      
    };

    new Profile(newProfile)
    .save()
    .then((profile)=>{
        res.redirect("/personal/add-profile", 304 , profile);
    })
    .catch((err)=>console.log(err));
});

//edit or modify the profile

router.put("/edit-profile/:id" ,upload.single("profile_photo"), (req , res)=>{
    Profile.findOne({_id:req.params.id}).then((updateProfile)=>{
        updateProfile.profile_photo=req.file;
        updateProfile.profile_name=req.body.profile_name;
        updateProfile.profile_email=req.body.profile_email;
        updateProfile.profile_contact=req.body.profile_contact;
        updateProfile.profile_location=req.body.profile_location;
        updateProfile.profile_gender=req.body.profile_gender;
        updateProfile.profile_education=req.body.profile_education;
        updateProfile.profile_specilization=req.body.profile_specilization;
        updateProfile.profile_university=req.body.profile_university;
        updateProfile.profile_coursetype=req.body.profile_coursetype;
        updateProfile.profile_marks=req.body.profile_marks;
        updateProfile.profile_yop=req.body.profile_yop;
        updateProfile.profile_skills=req.body.profile_skills;

        updateProfile.save()
        .then((update)=>{
            res.redirect("./personal/Profile" ,302, {update})
        })
        .catch((err)=>console.log(err));

    });
    
});

/*====================All post routes ends here=====================*/

module.exports = router;