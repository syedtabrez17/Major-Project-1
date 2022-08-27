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
    return res.render('user_sign_in',{
        title : 'Codeial | Sign In'
    })
}

// Render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title : 'Codeial | Sign Up'
    })
}

// get the sign up data
module.exports.create = function(req,res){

}

// get the sign in data
module.exports.createSession = function(req,res){
    
}