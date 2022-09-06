const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const UserModel = require('../models/user')

exports.validateJwt = (req,res,next) => {
    const bearerHeader = req.headers["authorization"];
    const {privateKey} = process.env;
    if(typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      jwt.verify(token, privateKey, (err, decoded)=>{
        if(decoded) {
          console.log("dekodirani id"+ decoded.id);
          req.body = {...req.body, id: decoded.id} 
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


  exports.updatePassword = (req,res)=>{
    console.log(req.body);
    const {privateKey} = process.env;
    const {oldPassword, newPassword, id} = req.body; 
    UserModel.find({'_id': id}, (err, users)=>{
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
                users[0].password = hash;
                users[0].save().then((savedUser)=>{
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
  }


  exports.login = (req,res,next)=>{
    const {email, password} = req.body; 
    const {privateKey} = process.env
    UserModel.find({'email': email}, (err,users)=> {
      if(err) {
        res.sendStatus(500);
      }
      else if(users.length === 0) {
        res.sendStatus(401); 
      }
      else {
        // provjeravamo jel sifra tacna
        bcrypt.compare(password, users[0].password).then((match) => {
          if(match) {
            jwt.sign({ id: users[0]._id }, privateKey,(err,token)=>{
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
  }


  exports.logout = (req,res,next)=>{
    const bearerHeader = req.headers["authorization"]
    if(typeof bearerHeader!=='undefined'){
      const bearerToken = bearerHeader.split(' ')[1]
      //add bearerToken to blacklist
    }
    return res.sendStatus(200)
  }


  exports.register = (req,res)=>{
    const {email,firstName,lastName,password} = req.body;
    UserModel.find({'email': email}, (err, users)=>{
      if(err) {
        res.sendStatus(500);
      }
      else if(users.length != 0) {
        res.sendStatus(400); 
      }
      else {
        // upisi u bazu inace
        bcrypt.hash(password, saltRounds).then((hash, err)=>{
          if(err) {
            res.sendStatus(500);
          }
          else {
            UserModel.create({firstName: firstName, lastName: lastName, email: email, password: hash}, (err, user)=>{
              if(err) {
                res.sendStatus(500); 
              }
              // inace vrati ok status
              return res.json(user);
            });
          }
        });
      }
    });
  }