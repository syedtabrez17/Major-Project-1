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

module.exports.sign_in = function(req,res){
    return res.render('sign_in',{
        title : 'Sign in Page'
    })
}

module.exports.sign_up = function(req,res){
    return res.render('sign_up',{
        title : 'Sign Up Page'
    })
}