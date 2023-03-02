const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {


    const user = new User({
      username,
      password: hash
    });

    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });

});

router.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  const promise = User.findOne({
    username: username
  });

  promise.then((user) => {
    if (!user) {
      res.json({
        status: false,
        message: 'Authentication failed, user not found1'
      });
    }
    else {
      console.log(password);
      console.log(user.password);
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: 'Authentication failed, user not found2'
          })

        }
        else {

          const payload = {
            username //bu username : username demek

          };

         const token=jwt.sign(payload, req.app.get('api_secret_key'), {
            expiresIn: 720
          });
          res.json({ status: true, token });
    
        }
      });

    }

  }).catch((err) => {
    throw err;

  });



});

module.exports = router;
