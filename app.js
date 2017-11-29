var express = require('express'), 
    app = express(), 
    bodyParser = require("body-parser"), 
    mongoose = require('mongoose'),
    flash = require("connect-flash"),
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"), 
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"); 
 
//requiring routes.     
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes       = require("./routes/index");
    

//mongoose.connect("mongodb://localhost/yelp_camp_v6"); 
//initiates database on mLab
mongoose.connect("mongodb://john:j0hnjames@ds125126.mlab.com:25126/yelpcamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); 
//will always be the directory the script lives in
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database



//Passport Configuration 
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

//calls this function on every route. 
//this allows us to ensure current 
//user is accessible in all of our 
//EJS files. 
app.use(function(req, res, next){
    //whatever we put in local is available 
    //is available in the rest of our template
    res.locals.currentUser = req.user; 
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success");
    next(); 
}); 

app.use("/", indexRoutes); 
app.use("/campgrounds", campgroundRoutes); 
app.use("/campgrounds/:id/comments", commentRoutes); 

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YELP CAMP server has started"); 
}); 