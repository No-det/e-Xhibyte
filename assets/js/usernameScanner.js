const User = require("../../models/user.model")


function userChecker(){
User.findOne({username : req.body.username}, function(err, user){
    if(err){
        console.log(err);
    }
    if(user){
        document.getElementById("check").innerHTML="Username already taken !"
    }
});
}