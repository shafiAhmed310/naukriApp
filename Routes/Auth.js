const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

//Auth schema and models
const User = require("../Model/Auth");

/*==========All get routes starts here============*/

router.get("/register" , (req , res)=>{
    res.render("./auth/register")
});





/*==========All get routes starts here============*/

/*==========All post routes starts here============*/

router.post("/register" , (req , res)=>{
    //Validation
    let errors = [];
    let {username , password,email,password2} = req.body;

    if(password != password2){
        errors.push({message:"password should math"});
    }
    if(password.length < 6){
        errors.push({message:"password should greater than six"});
    }
    if(errors.length > 0){
        res.render("./auth/register" , {
            errors,
            username,
            email,
            password,
            password2
        });
    }
    else{
        User.findOne({email}).then((user)=>{
            if(user){
                res.redirect("./auth/register" , 401 , {});
            }
              //create new email address
     
                else{
                    let newUser = new User({
                        username,
                        password,
                        email,
                    });
                    //make password hashed
                    bcrypt.genSalt(12 , (err , salt)=>{
                        bcrypt.hash(newUser.password , salt , (err , hash)=>{
                            newUser.password = hash;
                            newUser.save()
                            .then((user)=>{
                                res.redirect("/auth/login" , 201 ,{user:user});
                            })
                            .catch((err)=>console.log(err));

                        });
                    });
                }
        }).catch((err)=>console.log(err));
    }

});

router.get("/login" , (req , res)=>{
    res.render("./auth/login");
});

router.post("/login" , (req , res , next)=>{
    passport.authenticate("local" , {
        successRedirect: "./profile/add-profile",
    failureRedirect: "./auth/login",
    failureFlash: true,
    })(req , res ,next);
});

//========logout===============

router.get("/logout", (req , res)=>{
    req.logout();
 
    res.redirect("/auth/login", 201 , {});
});


module.exports = router;