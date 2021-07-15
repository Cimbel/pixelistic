const express = require('express');
const router = express.Router();
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret : 'server secret'});
const { User } = require('../models/user');

router.get('/', authenticate, User.getUsersForAdmin, (req, res) => {
  res.status(200).json({payload: req.payload});
});

router.patch('/', authenticate, User.updateStatus, (req, res) => {
  res.status(200).json({payload: {id:req.body.id, status:req.status} });
});

router.patch('/disable', authenticate, User.disableUser, (req, res) => {
  res.status(200).json({payload: req.payload });
});

module.exports = router;
