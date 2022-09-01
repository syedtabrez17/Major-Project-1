const User = require('../models/user');
module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: 'User Profile'
    });
}

module.exports.posts = function(req,res){
    return res.render('posts',{
        title: 'Post'
    });
}

// Render the sign in page
module.exports.signIn = function(req,res){
    if (req.isAuthenticated()){
       return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title : 'Codeial | Sign In'
    })
}

// Render the sign up page
module.exports.signUp = function(req,res){
    if (req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title : 'Codeial | Sign Up'
    })
}

// get the sign up data
module.exports.create = function(req,res){
    // console.log(req.body.password,req.body.confirm_password);
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err,user){
        if(err){
            console.log('error in finding user in signing up');
            return
        }
        if(!user){
            User.create(req.body, function(err,user){
                // console.log(user)
                // console.log(req.body)
                if(err){
                    console.log('Error in creating user while signing up');
                    return
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

// get the sign in data
module.exports.createSession = function(req,res){
    return res.redirect('/');
}