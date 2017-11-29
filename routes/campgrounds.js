var express = require("express"); 
var router = express.Router(); 
var Campground = require("../models/campground"); 
var middleware = require("../middleware"); 


//route route
router.get("/", function(req, res){
    //get all campgrounds from db, then render file 
    //compilation allows us to use the method 
    //.find() 
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err); 
       } else{
           res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user}); 
       }
    });
});


//CREATES adds new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from form, add to campground array. 
   //input links to these using 'name'in input definition. 
   var name = req.body.name; 
   var price = req.body.price; 
   var image = req.body.image; 
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   //creates new campground object 
   //it has variable -> name and image. 
   var newCampground = {name: name, image:image, description: desc , author: author};
   
   //creates new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err); 
       } else{
           //redirect back to campgrounds page. 
           console.log(newlyCreated); 
            res.redirect("/campgrounds"); 
       }
   });
});

//page that has input forms.  
//NEW --> Show form to create new campground 
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new"); 
})


//SHOW -> shows more info about one campground 
router.get("/:id", function(req, res){
    //find campground with provided ID. 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err); 
       } else{
         
           //render show template with that camgpround. 
           res.render("campgrounds/show", {campground: foundCampground});
       }
    });
});


//EDIT CAMPGROUND ROUTE 
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    //does user own the campground
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground}); 
    });
});


//UPDATE CAMPGROUND ROUTE 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground 
    
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds"); 
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
        
    })
});

module.exports = router; 