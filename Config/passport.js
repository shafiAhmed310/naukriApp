const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// load the schema

const User = require("../Model/Auth");


module.exports = (passport) =>{

passport.use(


    new LocalStrategy ({usernameField:"email"} ,( email , password , done )=>{

        User.findOne({email:email}).then((user)=>{
if(!user){
return done(null , false ,{
    message:"No user found please register and login" ,
});

}
//match password or valid password are not
bcrypt.compare(password , user.password , (err , isMatch)=>{

    if(err) throw err;
    if(isMatch){

        return done(null , user , {message: "login successfull"});

        return done(null , false , {message: "password is incorrect"});
    }
});
        
 

})
 .catch(err=>console.log(err))



    })
);

passport.serializeUser(function (user , done ){
done(null , user.id);
});

passport.deserializeUser(function (id ,done){
    User.findById( id , function (err , user){
        done(err , user);
    });
});

};