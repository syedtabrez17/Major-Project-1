const Post = require('../models/post');

const User = require('../models/user');

module.exports.home = function(req,res){

    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title : "Codeial | Home",
    //         posts: posts

    //     });
    // });
    // Populate the user for each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comment',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err, posts){

        User.find({}, function(err, users){
            if(err){console.log('Error');return}
            
            return res.render('home', {
                title : "Codeial | Home",
                posts: posts,
                all_users: users

            });
        });

        
    });
}

// module.exports.profile = function(req,res){
//     return res.end('<h1>This is profile</h1>');
// }