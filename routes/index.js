var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const saltRounds = 10;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", (req,res,next)=>{
  const {password} = req.body;
  const {email, passwordHash, privateKey} = process.env
  bcrypt.compare(password, passwordHash).then((match) => {
    if(match) {
      jwt.sign({ email: email }, privateKey,(err,token)=>{
        if(err) {
          return res.sendStatus(500);
        }
        res.json({token: token, username: req.body.email});
      });
    }
    else {
      res.sendStatus(401);
    }
  }).catch((err)=>{
    res.sendStatus(500)
  });
});


const validateJwt = (req,res,next) => {
  const bearerHeader = req.headers["authorization"];
  const {privateKey} = process.env;
  if(typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    jwt.verify(token, privateKey, (err, decoded)=>{
      if(decoded) {
        next();
      }
      else {
        res.sendStatus(403);
      }
    });
  }
  else {
    res.sendStatus(403);
  }
}

router.post("/updatePassword", validateJwt,  (req,res)=>{
  const {passwordHash, privateKey} = process.env;
  const {oldPassword, newPassword} = req.body;
  bcrypt.compare(oldPassword, passwordHash).then((match)=>{
    if(!match) {
      res.sendStatus(401);
    }
    else {
      bcrypt.hash(newPassword, saltRounds).then((hash, err)=>{
        if(err) {
          res.sendStatus(500);
        }
        else {
          // ubaci u bazu novu sifru
          // zasad ovo
          process.env.passwordHash = hash;
          res.sendStatus(200);
        }
      });
    }
  })
});



router.get("/logout", (req,res,next)=>{
  const bearerHeader = req.headers["authorization"]
  if(typeof bearerHeader!=='undefined'){
    const bearerToken = bearerHeader.split(' ')[1]
    //add bearerToken to blacklist
  }
  return res.sendStatus(200)
});

module.exports = router;
