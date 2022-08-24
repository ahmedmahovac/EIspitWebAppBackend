var express = require('express');
var router = express.Router();


const {getExam, takeExam, getQuestions, getQuestionImages, getQuestionPdf} = require("../controllers/studentController");

router.get("/exam", getExam); // korisnik ne treba bit logovan

router.post("/takeExam", takeExam); // treba jwt i ovdje

router.get("/questions/:examKey", getQuestions); // jer u get zahtjeve po konvenciji ne treba stavljat tijelo. Dodat jwt

router.get("/imageQuestion/:questionId", getQuestionImages);

router.get("/pdfQuestion/:questionId", getQuestionPdf);

module.exports = router