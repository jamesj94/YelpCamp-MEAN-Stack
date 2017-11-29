//this seeds the data to create campground and associates 
//them with comments. 

var mongoose = require("mongoose"); 
var Campground = require("./models/campground"); 
var Comment = require("./models/comment"); 


//passed in order to create campgrounds 
var data = [
    {
        name: "Hoh Rainforest", 
        image: "http://seattletrekker.com/wp-content/uploads/2014/12/Hoh-Rainforest-Nagarajan-Kanna.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac condimentum odio. Quisque justo justo, rutrum placerat massa eget, facilisis imperdiet erat. Integer et euismod augue, et varius diam. Nullam ac est nec ante luctus pharetra. Proin leo libero, viverra vel sem a, dignissim convallis elit. Fusce ut mauris a enim ornare porttitor vitae vel massa. Pellentesque vel scelerisque erat, ac blandit lorem. Quisque commodo erat a elit semper consectetur. Integer facilisis lacinia mauris dictum condimentum. Cras dignissim cursus euismod. Cras ac neque id purus mattis tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam imperdiet, eros nec consectetur tristique, urna nulla sollicitudin lorem, nec posuere justo tellus nec nisi."
    },
    {
        name: "Mount Olympus Washington",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbkfV6X3zvaSmaW77hDtvCsy6fgHJ3GKcHzEOwR6RKIunaEOZn",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac condimentum odio. Quisque justo justo, rutrum placerat massa eget, facilisis imperdiet erat. Integer et euismod augue, et varius diam. Nullam ac est nec ante luctus pharetra. Proin leo libero, viverra vel sem a, dignissim convallis elit. Fusce ut mauris a enim ornare porttitor vitae vel massa. Pellentesque vel scelerisque erat, ac blandit lorem. Quisque commodo erat a elit semper consectetur. Integer facilisis lacinia mauris dictum condimentum. Cras dignissim cursus euismod. Cras ac neque id purus mattis tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam imperdiet, eros nec consectetur tristique, urna nulla sollicitudin lorem, nec posuere justo tellus nec nisi."
    },
    {
        name: "Way to Lapush",
        image: "data:image/jpeg;base64,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",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac condimentum odio. Quisque justo justo, rutrum placerat massa eget, facilisis imperdiet erat. Integer et euismod augue, et varius diam. Nullam ac est nec ante luctus pharetra. Proin leo libero, viverra vel sem a, dignissim convallis elit. Fusce ut mauris a enim ornare porttitor vitae vel massa. Pellentesque vel scelerisque erat, ac blandit lorem. Quisque commodo erat a elit semper consectetur. Integer facilisis lacinia mauris dictum condimentum. Cras dignissim cursus euismod. Cras ac neque id purus mattis tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam imperdiet, eros nec consectetur tristique, urna nulla sollicitudin lorem, nec posuere justo tellus nec nisi."
    }
];


//removes all campgrounds in database. 
function seedDB(){
    //remove all campgrounds 
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds"); 
    
        // add a few campgrounds 
     data.forEach(function(seed){
         Campground.create(seed, function(err, campground){
             if(err){
                 console.log(err); 
             }
             else{
                 console.log("added a campground"); 
                 //add a few comments.
                 Comment.create(
                    {
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function(err, comment){
                        if(err){
                            console.log(err); 
                        } else{
                            //associates comment with campground
                            campground.comments.push(comment); 
                            campground.save();   
                            console.log("Created new comment");
                        }
                    }); 
             }
        });
    }); 
    }); 
}

module.exports = seedDB; 