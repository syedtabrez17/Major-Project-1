const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req, res){
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error
                if(err){
                    console.log('Error in creating comment');
                    return
                }
                // console.log(comment);
                // console.log('1')
                post.comment.push(comment);
                // console.log('2');
                post.save();
                // console.log('3')

                res.redirect('/');
            });
        }

    });
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err,comment){
        if(err){
            console.log('Error in finding the comment');
            return;
        }
        if(comment.user = req.user.id){
          let postId = comment.post;

            comment.remove();

          Post.findByIdAndUpdate(postId,{$pull:{comment: req.params.id}}, function(err, post){
            return res.redirect('back');
          })  
        }else{
            return res.redirect('back');
        }
    });
}