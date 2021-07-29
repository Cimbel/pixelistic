const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret : 'server secret'});
const Post = require('../models/post');
const { User } = require('../models/user');
var AWS = require('aws-sdk');
AWS.config = require('../const/aws-config.json');

const saveToBucket = (req, res, next) => {
  const { post } = req.body;
  const s3 = new AWS.S3();
  const myBucket = process.env.AWS_BUCKET_NAME;
  const data = post.image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = new Buffer(data, 'base64');
  const ext = post.image.split(';')[0].split('/')[1];
  const pathTosave = `${post.author}/${Date.now()}.${ext}`;
  
  params = {Bucket: myBucket, 
    Key: pathTosave,
    Body:  buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL:'public-read-write'
    };

  s3.putObject(params, (err) => {
      if (err)  next(err)
      req.body.post.image = pathTosave;
      next(); 
    }
  );
}

const removeFromBucket = (req, res, next) => {
  const s3 = new AWS.S3();
  const myBucket = process.env.AWS_BUCKET_NAME;

  const params = {
    Bucket: myBucket, 
    Key: req.body.imagePath
   };
   s3.deleteObject(params, (err) => {
    if (err) next(err);
    next()          
   }) 
}

const addPostToUser = async (req, res, next) => {
  const userId = req.addedPost.author._id;
  const postId = req.addedPost._id;
  try {
    await User.findByIdAndUpdate(userId, { $push: { posts: postId } },{ new: true });
    next();
  } catch(err) {
    err.status = 422;
    next(err)  
  }
  
}

const removePostFromUser = async (req, res, next) => {
  const { userId, postId } = req.body;
  try{
    await User.findByIdAndUpdate(userId, { $pull: { posts: postId } },{ new: true });
    next();
  } catch(err){
    err.status = 422;
    next(err)  
  }
}

router.post('/add-post', authenticate, saveToBucket, Post.addPost, addPostToUser, (req, res, next) => {
  res.status(200).json({ post: req.addedPost });
})

router.delete('/remove-post', authenticate, removePostFromUser, Post.removePost, removeFromBucket, (req, res, next) =>{
  res.status(200).json({ postId: req.body.postId });
})

router.patch('/like-post', authenticate, Post.addLike, (req, res, next) => {
  res.status(200).json({ newLikes: { likes: req.likes, _id: req.postId } });
});

router.patch('/unlike-post', authenticate, Post.removeLike, (req, res, next) => {
  res.status(200).json({ newLikes: { likes: req.likes, _id: req.postId } });
});

router.patch('/comment-post', authenticate, Post.addComment, (req, res, next) => {
  res.status(200).json({ newComments: { comments: req.comments, _id: req.postId } });
});

module.exports = router;
