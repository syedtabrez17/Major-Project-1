const Post = require('../models/post');

const User = require('../models/user');

module.exports.home = async function(req,res){

    try{
        // Populate the user for each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate:{
                path: 'user'
            }
        });
        
        let users = await User.find({});

        return res.render('home', {
            title : "Codeial | Home",
            posts: posts,
            all_users: users

        });
    }catch(err){
        console.log('Error',err);
        return;
    }

        
}

// module.exports.profile = function(req,res){
//     return res.end('<h1>This is profile</h1>');
// }