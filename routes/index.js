var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", (req,res,next)=>{
  const {emailReq, password} = req;
  const {email, passwordHash, privateKey} = process.env
  bcrypt.compare(password, passwordHash).then((match) => {
    if(match) {
      token = jwt.sign({ username:username }, privateKey);
      if(token) {
        return res.json({token: token, username: "uspješno ulogovani korisnik " + emailReq});
      }
    }
    return res.sendStatus(401);
  }).catch((err)=>res.sendStatus(500));
});

router.get("/logout", (req,res,next)=>{
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader!=='undefined'){
    const bearerToken = bearerHeader.split(' ')[1]
    //add bearerToken to blacklist
  }
  return res.sendStatus(200)
});

module.exports = router;
