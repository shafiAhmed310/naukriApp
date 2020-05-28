const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const passport = require("passport");
const methodOverride = require("method-override");
const bodyparser = require("body-parser");

//init app top level function
const app = express();

//import students routes
const profile = require("./Routes/profileData");

//import auth routes

const auth = require("./Routes/Auth");

//import job routes

const job = require("./Routes/jobs");

//handlebars helper middleware
handlebars.registerHelper("trimString" , function(passedString){
    var theString = [...passedString].splice(6).join("");
    return new handlebars.SafeString(theString);
});




//connect database
mongoose.connect(
    process.env.MONGODB_URL , {useNewUrlParser:true , useCreateIndex:true , useUnifiedTopology:true} , (err)=>{
        if(err) throw err;
        console.log("Database is connected successfully")
    }
);

//express handlebars middleware
app.engine("handlebars" , exphbs());
app.set("view engine" ,"handlebars" );

//serve static files and express.static middleware
app.use(express.static(__dirname + "/node_modules"));
app.use(express.static(__dirname + "/public"));


//bodyparser middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

// load the passport module

require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());



//method override middleware here
app.use(methodOverride('_method'));

//home routes can add in server.js file only
app.get("/" , (req, res)=>{
    res.render("home.handlebars");
})

  //Application level middleware

  app.use("/profile" , profile);

app.use("/auth" , auth);

app.use("/job" , job);

let port = process.env.PORT || 7000;

app.listen(port, (err) => {
  if (err) throw err;
  console.log("app is running on port number " + port);
});

