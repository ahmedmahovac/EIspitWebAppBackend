var express = require('express');
var router = express.Router();



// kontroleri

const {validateJwt, updatePassword, login, logout, register} = require('../controllers/generalController');

// OVO MOZE BIT ROUTER ZA RUTE VEZANE ZA PRIJAVU REGISTRACIJU ITD, TO IMA SMSISLA. SAMO DA RAZDVOJIM OVE POMOCNE FUNKCIJE U CONTROLLER KOJI JE VEZAN ZA OVAJ ROUTER

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/login", login);


router.post("/updatePassword", validateJwt, updatePassword);


router.get("/logout", logout);


router.post("/register", register);





module.exports = router;
