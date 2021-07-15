const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  author:{
    type: mongoose.Schema.ObjectId , ref: 'User',
    required: true
  },
  timestamp:{
    type: Number,
    required: true
  },
  likes: [ { type:  mongoose.Schema.ObjectId, ref: 'User' } ],
  comments: [ {
    comment: {
      type: String,
      require: true
    },
    author: {
      type: String,
      required: true
    },
    authorAvatar: {
      type: String,
      required: true
    }
  } ],
  geolocation: String,
  description: String
});

PostSchema.statics.addPost = async (req, res, next) => {
  try{
    req.body.post.timestamp = Date.now(); 
    const addedPost = await Post.create(req.body.post);
    req.addedPost = await Post.populate(addedPost, { path: 'author', select: 'nickname avatar' });
    next();
  } catch(err) {
    next(err);
  }
}

PostSchema.statics.removePost = async (req, res, next) => {
  try{
    await Post.remove({ _id: req.body.postId });
    next();
  } catch(err) {
    next(err);
  }
}

PostSchema.statics.addLike = async (req, res, next) => {
  try{
    const updatedPost = await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } }, { new: true });
    req.likes = updatedPost.likes;
    req.postId = updatedPost._id;
    next();
  } catch(err) {
    next(err);
  }
  
  
}

PostSchema.statics.removeLike = async (req, res, next) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } }, { new: true });
    req.likes = updatedPost.likes;
    req.postId = updatedPost._id;
    next();
  } catch(err) {
    next(err);
  }
  
 
}

PostSchema.statics.addComment = async (req, res, next) => {
  const comment = {
    comment: req.body.comment,
    author: req.body.userNickname,
    authorAvatar: req.body.userAvatar
  }

  try{
    const updatedPost = await Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true });
    req.comments = updatedPost.comments;
    req.postId = updatedPost._id;
    next();
  } catch (err){
    next(err);
  }

}
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
