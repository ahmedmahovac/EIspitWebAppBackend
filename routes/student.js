var express = require('express');
var router = express.Router();


const {getExam} = require("../controllers/studentController");

router.get("/exam", getExam); // korisnik ne treba bit logovan


module.exports = router  