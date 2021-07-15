const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret : 'server secret'});
const { User } = require('../models/user');
const FollowingInfo = require('../models/following-info');

const getAdditionalInfo = async (req, res, next) => {
  try {
    const data = await User.findById(
      {'_id': req.body.following}, 
      'status -_id'
    );

    req.payload.status = data.status;
    next();
  } catch (err) {
    next(err);
  }
}

router.patch('/follow', authenticate, FollowingInfo.follow, User.follow, getAdditionalInfo, (req, res) => {
  res.status(200).json({payload: req.payload});
});

router.patch('/unfollow', authenticate, FollowingInfo.unfollow, User.unfollow, (req, res) => {
  res.status(200).json({payload: req.body.followingId});
});

router.patch('/handle-favorite', authenticate, FollowingInfo.handleFavorite, (req, res) => {
  res.status(200).json({payload: req.body});
});

module.exports = router;
