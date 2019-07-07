var mongoose = require('mongoose'),
    Campground = require('./models/campground');
    Comment = require('./models/comment');
var data = [
  { name: "Cloud's Rest",
    image: "https://farm9.staticflickr.com/8300/7930013108_cd3e432ba5.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  { name: "Morning has broken",
    image: "https://farm4.staticflickr.com/3911/14707566622_af236f9b65.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  { name: "Cloud's up",
    image: "https://farm7.staticflickr.com/6103/6333668591_90e7c2bc72.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  }
]

function seedDB(){
  //REMOVE ALL CAMPGROUNDS
  Campground.deleteMany({},function(err){
    if(err){
      console.log(err);
    }
    console.log('removed campground');
        //ADD A FEW CAMPGROUNDS
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err)
                  }
                else {
                    console.log("added a campground");
                    //CREATE A COMMENTS
                      Comment.create(
                      {
                            text :"this place is great but i wish there were no lizard",
                            author:"Homer"
                      },function(err, comment){
                        if(err){
                          console.log(err);
                        }
                        else{
                          campground.comments.push(comment);
                          campground.save();
                          console.log("Created new comment");
                        }
                      }) ;
                 }
            })
        })
  })

  //ADD A FEW COMMENTS

}


module.exports = seedDB;
