var AWS = require('aws-sdk');
AWS.config = require('../const/aws-config.json');

const saveAvatar = (req, res, next) => {
  if (req.body.avatar && req.body.avatar.startsWith('data:image')) {
    const s3 = new AWS.S3();
    const myBucket = process.env.AWS_BUCKET_NAME;
    const data = req.body.avatar.replace(/^data:image\/\w+;base64,/, '');
    const buffer = new Buffer(data, 'base64');
    const ext = req.body.avatar.split(';')[0].split('/')[1];
    const saveDir = `avatar/${req.params.id}`;
    const completePath = `${saveDir}/${Date.now()}.${ext}`;

    params = {
      Bucket: myBucket,
      Key: completePath,
      Body: buffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
      ACL: 'public-read-write'
    };
    try {
      s3.putObject(params, (err) => {
        if (err) next(err);
        req.body.avatar = completePath;
        next();
      });
    }
    catch (err) {
      next(err);
    }
  } else {
    next();
  }
}

module.exports = { saveAvatar }
