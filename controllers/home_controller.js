const Post = require('../models/post');

module.exports.home = function(req,res){

    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title : "Codeial | Home",
    //         posts: posts

    //     });
    // });

    Post.find({}).populate('user').exec(function(err, posts){
        if(err){console.log('Error');return}
        
        return res.render('home', {
            title : "Codeial | Home",
            posts: posts

        });
    });
}

// module.exports.profile = function(req,res){
//     return res.end('<h1>This is profile</h1>');
// }