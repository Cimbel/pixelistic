const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const { nameReq, emailReq, emailValid, passReq, passLen, passMatch, incorrect } = require('../const/error-messages.js');


const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    default: 'avatar/5ba68dab2c08b924204ee715/1537725117556.png'
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    default: false
  },
  resetPasswordExpires: {
    type: String,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'offline'
  },
  fullName: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  socketId: {
    type: String,
    default: 'offline'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  followingsInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FollowingInfo' }],
  followings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
  password: String,
  googleID: String,
  facebookID: String
});

UserSchema.plugin(uniqueValidator, { message: 'This {PATH} already used' });

const getUser = async (query) => {
  return await User.findOne(query)
  .populate({ 
    path: 'posts',
    populate: { path : 'author', select: 'nickname avatar'}
  })
  .populate('followingsInfo', 'favorite newMessages followingId')
  .populate('followings', 'followers status nickname avatar bio website fullName -_id')
  .populate ({
    path: 'followings', populate: {
      path:'posts',
      populate: { path : 'author', select: 'nickname avatar'}
    }
  })
  .populate('followers', 'status socketId');
}

UserSchema.statics.authenticate = async (req, res, next) => {
  try {
    let user = await getUser({ email: req.body.email });

    if (!user) {
      let err = new Error(incorrect);
      err.status = 422;
      return next(err);
    }
    if (!user.isActive && !user.disabled) {
      let err = new Error('Your account is currently suspended');
      err.status = 422;
      next(err);
    }
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      req.session.user = user;
      return next();
    } else {
      let err = new Error(incorrect);
      err.status = 422;
      return next(err);
    }
  } catch (err) {
    err.status = 422;
    return next(err);
  }
}

UserSchema.statics.authenticateSocial = async (req, res, next) => {
  let currentUser;
  try {
    const user = req.body.user;

    if (user.googleId) {
      currentUser = await getUser({ googleID: user.googleId });
    } else {
      currentUser = await getUser({ facebookID: user.id });
    }

    if (currentUser) {
      if (!currentUser.isActive && !user.disabled) {
        let err = new Error('Your account is currently suspended');
        err.status = 422;
        next(err);
      }
      req.session.user = currentUser;
      return next();
    }

    currentUser = await getUser({ email: user.email });

    if (currentUser) {
      if (user.googleId) {
        await User.update({ email: user.email }, {
          googleID: user.googleId,
        });
      } else {
        await User.update({ email: user.email }, {
          facebookID: user.id,
        });
      }
      if (!currentUser.isActive && !user.disabled) {
        let err = new Error('Your account is currently suspended');
        err.status = 422;
        next(err);
      }
      req.session.user = currentUser;
      return next();
    }

    let newUser;
    if (user.googleId) {
      newUser = await new User({
        nickname: user.name,
        googleID: user.googleId,
        email: user.email,
        avatar: user.imageUrl
      }).save();
    } else {
      newUser = await new User({
        nickname: user.name,
        facebookID: user.id,
        email: user.email,
        avatar: user.picture.data.url
      }).save();
    }

    req.session.user = newUser;
    return next();
  } catch (err) {
    err.status = 422;
    return next(err);
  };
};

UserSchema.statics.isUserInDB = async (email, nickname) => {
  let res = await User.find({ $or: [{ email: email }, { nickname: nickname }] });
  return res.length;
}

UserSchema.statics.isEmailDB = async (req, res, next) => {
  let result = await User.findOne({ email: req.body.email });
  if (result) {
    bcrypt.hash(toString(result.email), 10, (err, hash) => {
      if (err) {
        return next(err);
      } else {
        token = hash;
        resetPasswordToken = token;
        resetPasswordExpires = Date.now() + 3600000; // 1 hour
        result.update({ resetPasswordToken: resetPasswordToken }).exec();
        result.update({ resetPasswordExpires: resetPasswordExpires }).exec();

        return next();
      }
    })
  } else {
    const err = new Error('There is no user with this email');
    err.status = 422;
    return next(err);
  }
}

UserSchema.statics.isResetTikenOk = (req, res, next) => {
  User.findOne({ resetPasswordToken: req.query.reset, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
    if (user === null) {
      const err = new Error('Token incorect or expire');
      err.status = 422;
      return next(err);
    } else {
      return next();
    }
  });
}

UserSchema.statics.isPaswordChanged = (req, res, next) => {
  let token = req.body.resetToken.substring(7, req.body.resetToken.length)
  if (req.body.password === req.body.passwordConf) {
    User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function (err, result) {
      if (result === null) {
        const err = new Error('Token incorrect or expore!');
        err.status = 422;
        return next(err);
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return next(err);
          } else {
            result.update({ password: hash }).exec();
            return next();
          }
        })
      }
    });
  } else {
    const err = new Error(passMatch);
    err.status = 422;
    return next(err);
  }
}

UserSchema.statics.validate = (req, res, next) => {
  req.checkBody('nickname', nameReq).notEmpty();
  req.checkBody('email', emailReq).notEmpty()
  req.checkBody('email', emailValid).isEmail();
  req.checkBody('passwordConf', passReq).notEmpty()
  req.checkBody('passwordConf', passLen).isLength({ min: 6 });
  req.checkBody('password', passReq).notEmpty();
  req.checkBody('password', passLen).isLength({ min: 6 });
  req.checkBody('password', passMatch).equals(req.body.passwordConf);

  let errors = req.validationErrors();
  if (errors) {
    let err = new Error(errors[0].msg);
    err.status = 422;
    return next(err);
  }
  return next();
}

UserSchema.pre('save', function (next) {
  let user = this;
  if (user.password) {
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.passwordConf = hash;
      next();
    });
  } else {
    next();
  }
});

// followings
UserSchema.statics.follow = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { '_id': req.body.current },
      { $push: { 'followingsInfo': req.payload.followingInfoId, 'followings': req.body.following } },
    );
    await User.findOneAndUpdate(
      { '_id': req.body.following },
      { $push: { 'followers': req.body.current } },
    );
    next();
  } catch (err) {
    next(err);
  }
};

UserSchema.statics.unfollow = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { '_id': req.body.current },
      { $pull: { 'followingsInfo': req.body.followingInfoId, 'followings': req.body.followingId } }
    );
    await User.findOneAndUpdate(
      { '_id': req.body.followingId },
      { $pull: { 'followers': req.body.current } }
    );
    next();
  } catch (err) {
    next(err);
  }
};

//profile
UserSchema.statics.getProfile = async (req, res, next) => {
  try {
    req.payload = await User.findOne(
      { nickname: req.params.nickname },
      'avatar posts nickname followings followers bio fullName website'
    ).populate({
      path: 'posts',
      populate: { path: 'author', select: 'nickname avatar' }
    });
    if (req.payload) {
      next();
    } else {
      let error = new Error('User not found.');
      error.status = 404;
      next(error);
    }
  } catch (err) {
    next(err);
  }
};

UserSchema.statics.saveEditProfile = async (req, res, next) => {
  try {
    let userId = req.params.id;
    let updatedProfile = {
      fullName: req.body.fullName,
      nickname: req.body.nickname,
      website: req.body.website,
      bio: req.body.bio
    }
    if (req.body.avatar) {
      updatedProfile.avatar = req.body.avatar
    }

    let userProfile = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updatedProfile },
      { new: true }
    );
    req.payload = userProfile;
    next();
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      let error = new Error('The nickname already exist');
      error.status = 409;
      next(error);
    } else {
      next(err);
    }
  };
};

UserSchema.statics.changePassword = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    let match = await bcrypt.compare(req.body.oldPassword, user.password);
    if (match) {
      if (req.body.newPassword === req.body.newPasswordConf) {
        await bcrypt.hash(req.body.newPassword, 10, async (err, hash) => {
          if (err) {
            return next(err);
          } else {
            await User.findOneAndUpdate(
              { _id: req.params.id },
              { $set: { password: hash } }
            );
            req.payload = 'Password successfuly changed';
            return next();
          }
        })

      } else {
        const err = new Error(passMatch);
        err.status = 400;
        return next(err);
      }
    } else {
      let err = new Error('Password incorrect');
      err.status = 400;
      return next(err);
    }
  } catch (err) {
    next(err);
  };
};

//dashboard
UserSchema.statics.getUsersForAdmin = async (req, res, next) => {
  try {
    req.payload = await User.find({});
    next();
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

UserSchema.statics.updateStatus = async (req, res, next) => {
  const newUser = await User.findByIdAndUpdate(req.body.id, { $set: { 'isActive': req.body.status } }, { new: true });
  req.status = newUser.isActive;
  next();
};

UserSchema.statics.disableUser = async (req, res, next) => {
  await User.update({ '_id': { '$in': req.body.IDs } }, { $set: { 'disabled': true,  'isActive': false }} ,{ new: true });
  req.payload = await User.find({});
  next();
};

const User = mongoose.model('User', UserSchema);
module.exports = { User, getUser };
