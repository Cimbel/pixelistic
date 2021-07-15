const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const authenticate = expressJwt({ secret: "server secret" });
const HashForEmail = require("../models/hashForEmail");
const { User, getUser } = require('../models/user');
const { host, port } = require('../const/node-config');

const prepareUser = ({_id, nickname, email, posts, isAdmin, avatar, disabled, fullName, website, bio, followings, followingsInfo, followers}) => {
  return {_id, nickname, email, isAdmin, posts, avatar, disabled, fullName, website, bio, followings, followingsInfo, followers};
};

/**
 * Function sends an email to confirm the user's email address
 *
 * @param {Object} user
 */
const confirmEmail = user => {
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.G_NAME,
      pass: process.env.G_PASS
    }
  });
  bcrypt.hash(user.email, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    let newUser = {
      nickname: user.nickname,
      email: user.email,
      password: user.password,
      hash
    };
    HashForEmail.create(newUser);

    //Delete the hash after 5 minutes
    setTimeout(() => {
      HashForEmail.findOne({ hash: hash }, (err, hashForEmail) => {
        hashForEmail.remove();
      });
    }, 5 * 60 * 1000);

    let link = `${host}:${port}/verify?hash=${newUser.hash}`;
    let mailOptions = {
      to: user.email,
      subject: "Please confirm your Email account",
      html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}>Click here to verify</a>`
    };
    smtpTransport.sendMail(mailOptions);
  });
};

const authUser = (req, res) => {
  req.token = jwt.sign(prepareUser(req.session.user), 'server secret', { expiresIn: '2h'});
  res.status(200).json({user: prepareUser(req.session.user), accessToken: req.token});
}

router.post('/register', User.validate, async (req, res, next) => {
  if (await User.isUserInDB(req.body.email, req.body.nickname)) {
    const err = new Error("User exists");
    err.status = 422;
    next(err);
  }
  confirmEmail(req.body);
  return res
    .status(200)
    .json({ text: `Email has been sent. Please check the inbox` });
});

router.post('/login', User.authenticate, authUser);

router.post('/login/social', User.authenticateSocial, authUser);

router.get("/validate-token", authenticate, async (req, res, next) => {
  try {
    const user = await getUser({'_id': req.user._id});
    if (!user.isActive) {
      let err = new Error('User is suspended');
      err.status = 422;
      next(err);
    }
    res.status(200).json({user: prepareUser(user)});
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res, next) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) return next(err);
      return res.status(200).json({});
    });
  }
});

router.get("/verify", (req, res, next) => {
  HashForEmail.findOne({ hash: `${req.query.hash}` }, (err, hashForEmail) => {
    try {
      let newUser = {
        nickname: hashForEmail.nickname,
        email: hashForEmail.email,
        password: hashForEmail.password,
      };
      //Add user
      User.create(newUser);
      res.redirect("/sign-in");
    } catch (err) {
      err.status = 422;
      next(err);
    }
    if (err) {
      let error = new Error("Verification failed");
      error.status = 422;
      next(error);
    }
  });
});

router.post('/forgot', User.isEmailDB, (req, res, next) => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.G_NAME,
      pass: process.env.G_PASS
    }
  });
 
    let link = `${host}:${port}/change?reset=${resetPasswordToken}`;
    let mailOptions = {
      to: req.body.email,
      subject: 'Reset password',
      html: `<h1>Hello,</h1><br> <h2>If you want to change your password, please <a href=${link}>click here</a> or ignore this letter.</h2>`,
    };
    smtpTransport.sendMail(mailOptions);
    return res.status(200).json({text: `Reset link was sent to your email. Please check your inbox.`});
})

router.get('/change', User.isResetTikenOk, async (req, res) => {
  return res.status(200);
})

router.post('/change', User.isPaswordChanged, async (req, res) => {
  return res.status(200).json({text: 'Password was changed.'});
})

module.exports = router;
