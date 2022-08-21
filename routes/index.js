var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const saltRounds = 10;
const UserModel = require('../models/user')


// OVO MOZE BIT ROUTER ZA RUTE VEZANE ZA PRIJAVU REGISTRACIJU ITD, TO IMA SMSISLA. SAMO DA RAZDVOJIM OVE POMOCNE FUNKCIJE U CONTROLLER KOJI JE VEZAN ZA OVAJ ROUTER

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", (req,res,next)=>{
  const {email, password} = req.body;
  const {privateKey} = process.env
  UserModel.find({'email': email}, (err,users)=> {
    if(err) {
      res.sendStatus(500);
    }
    else if(users.length === 0) {
      res.sendStatus(401); // nije nadjen nijedan korisnik sa datim emailom, javljam istu gresku ko i kad nije tacna sifra. Mogu ova dva slucaja razdvojit al za sad je ovako ok
    }
    else {
      // provjeravamo jel sifra tacna
      bcrypt.compare(password, users[0].password).then((match) => {
        if(match) {
          // odaberi drugi payload
          jwt.sign({ email: email }, privateKey,(err,token)=>{
            if(err) {
              return res.sendStatus(500); // interni error prilikom sign-anja
            }
            return res.json({token: token, username: users[0].email}); 
          });
        }
        else {
          // nepodudaranje sifre
          res.sendStatus(401);
        }
      }).catch((err)=>{
        res.sendStatus(500)
      });
    }
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
  console.log(req.body) 
  const {privateKey} = process.env;
  const {oldPassword, newPassword, user} = req.body; // u useru je trenutno samo mejl jer nemam virtuelnu kolekciju kreiranu !
  UserModel.find({'email': user}, (err, users)=>{
    if(err) {
      res.sendStatus(500);
    }
    else {
      // inace je sigurno pronadjen korisnik
      bcrypt.compare(oldPassword, users[0].password).then((match)=>{
        if(!match) {
          res.sendStatus(401);
        }
        else {
          bcrypt.hash(newPassword, saltRounds).then((hash, err)=>{
            if(err) {
              res.sendStatus(500);
            }
            else {
              console.log("sve dosad ok")
              // ubaci u bazu novu sifru
              users[0].password = hash;
              users[0].save().then((savedUser)=>{
                console.log(savedUser);
                res.sendStatus(200);
              }).catch(err => {
                console.log(err);
                res.sendStatus(500);
              })
            }
          });
        }
      })
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



router.post("/register", (req,res)=>{
  // provjeri dal postoji korisnik sa istim mejlom, ako da, vrati gresku
  const {email,firstName,lastName,password} = req.body;
  UserModel.find({'email': email}, (err, users)=>{
    if(err) {
      //posalji indikator greske prilikom komunikacije sa bazom
      res.sendStatus(500);
    }
    else if(users.length != 0) {
      // posalji indikator da korisnik sa datim emailom vec postoji
      res.sendStatus(400); // ovo je otprilike odgovarajuci kod za klijentsku gresku
    }
    else {
      // upisi u bazu inace
      // dodaj hesiranje passworda
      bcrypt.hash(password, saltRounds).then((hash, err)=>{
        if(err) {
          res.sendStatus(500);
        }
        else {
          UserModel.create({firstName: firstName, lastName: lastName, email: email, password: hash}, (err, user)=>{
            // ako tu dodje do greske, vrti gresku
            if(err) {
              res.sendStatus(500); // moze se rec serverska interna greska
            }
            // inace vrati ok status
            return res.json(user);
          });
        }
      });

    }
  });
  
  
});





module.exports = router;
