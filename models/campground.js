var mongoose = require("mongoose"); 

//schema setups -> on big projects, break this up into 
//separate files. 
//creates a Schema to define each thing in database. 
//in this case each object has a name and image url. 

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
        id:{
          type: mongoose.Schema.Types.ObjectId, 
          ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});


module.exports = mongoose.model("Campground", campgroundSchema); 

