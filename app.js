var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    mongoose   = require('mongoose'),
    flash      =require('connect-flash'),
    passport   = require('passport'),
    LocalStrategy = require('passport-local'),
    methodOverride = require('method-override'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User       = require("./models/user"),
    seedDB     = require('./seeds');
//requiring routes
var commentRoutes      = require("./routes/comments"),
    campgroundRoutes   = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index");

    // mongoose.set('useNewUrlParser', true);
    // mongoose.set('useFindAndModify', false);
    // mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/yelp_camp_v12',{useNewUrlParser:true});
// mongoose.createConnection('mongodb://localhost:27017/yelp_camp_v10', { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/yelp_camp_v10', { useFindAndModify: false });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();
//seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
   secret: "Yelp Camp is my first full web page app",
   resave: false,
   saveUninitialized: false
}))
app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error =req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

//route files exporting the router
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000,function(){
  console.log("Yelp Camp Server Has Started!");
})
