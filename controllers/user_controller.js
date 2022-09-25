const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err,user){
        return res.render('user_profile',{
            title: 'User Profile',
            profile_user: user

        });
    });
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err instanceof multer.MulterError){
                    // console.log(err);
                    // res.send(err)
                    // req.flash('error', 'Only .png, .jpg and .jpeg format allowed!');
                    return res.redirect('back');
                }
                else if(err){
                    console.log('Multer Error: ', err);
                    // req.flash('error', 'Only .png, .jpg and .jpeg format allowed!');
                    return res.redirect('back');
                }
                // console.log(req.file);
                user.name = req.body.name;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }


                    // This is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            req.flash('error', err);
            return res.redirect('back');
        }

    }else{
        req.flash('error', 'Unauthorized');
        return res.status(401).send('Unauthorized');
    }
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
                
                req.flash('success', 'Account created successfully!');
                return res.redirect('/users/sign-in');
            });
        }
        else{
            req.flash('error', 'Account already exist!');
            return res.redirect('back');
        }
    });
}

// sign in and create session for the user
module.exports.createSession = function(req,res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout(function(err){
        if (err){
            console.log('Error in logging out');
        }
    });
    req.flash('success', 'You have logged out!');
    
    return res.redirect('/');
}