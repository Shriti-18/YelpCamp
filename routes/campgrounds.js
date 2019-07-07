var express = require('express');
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");
//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

//======================== CREATE: Add new campgrounds to database =============//
router.post("/",middleware.isLoggedIn,function(req,res){
    //get data from form and add to campgrounds array
    var name=req.body.name;
    var image=req.body.image;
    var desc = req.body.description;
    var cost = req.body.cost;
    var author = {
      id: req.user._id,
      username: req.user.username
    }
    var newCampground={name:name,cost:cost, image:image, description: desc,author : author};
    // campgrounds.push(newCampground);
    //Create new campground and add it to the DB
    Campground.create(newCampground,function(err, newlyCreated){
      if(err){
        console.log(err);
      }
      else {
        //redirect back to campground page
        console.log(newlyCreated);
          req.flash("success","Added a campground!");
        res.redirect("/campgrounds");
      }
    })
});

//======================== NEW : form to make new campgrounds ========================//
router.get("/new",middleware.isLoggedIn,function(req,res){
  res.render("campgrounds/new");
})

//======================== SHOW : show detailed information about one campground ===============//

router.get("/:id",function(req,res){
  //find the campground with provided // ID
  Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err || !foundCampground)
    {
      req.flash("error","Campground not found!");
      res.redirect("back");
    }
    else {
      //render show template with that campground
      console.log(foundCampground);
      res.render("campgrounds/show",{campground: foundCampground});
    }
  });
});

//Edit campground route

router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
  //is user logged in
        Campground.findById(req.params.id,function(err,foundCampground){
                res.render("campgrounds/edit",{campground: foundCampground});
        })
      })


//Update campground Route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
   var newData = {name: req.body.name, image: req.body.image, cost: req.body.cost, description: req.body.desc};
    //find and Update the correct campgrounds
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, {$set: newData}, function(err,updatedCampground){
      if(err){
        res.redirect("/campgrounds");
      }else{
        res.redirect("/campgrounds/"+req.params.id);
      }
    })
    //redirect somewhere (show page)
})
//Destroy Campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
  Campground.findByIdAndRemove(req.params.id,function(err){
    if (err) {
       res.redirect("/campgrounds");
    }else {
      res.redirect("/campgrounds");
    }
  })
})

//middleware




module.exports = router;
