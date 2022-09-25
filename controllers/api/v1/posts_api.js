const Post = require('../../../models/post');

const Comment = require('../../../models/comment');

module.exports.index = async function(req, res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comment',
            populate:{
                path: 'user'
            }
        });

    return res.json(200, {
        message: "List of posts",
        posts: posts
    }); 
}

module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);
        // .id means converting the object id into string
        // if(post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});


            
        // req.flash('success', 'Post and associated comments deleted!');
            return res.status(200).json({
                message: "Post and associated comments deleted successfully"
            })
        // }else{
            // req.flash('error', 'You cannot delete this post!');
            // return res.redirect('back');
        // }
    }catch(err){
        // req.flash('err', err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}