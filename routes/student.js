var express = require('express');
var router = express.Router();


const {getExam, takeExam, getQuestions, getQuestionImage, getQuestionPdf, getQuestionImageObjects} = require("../controllers/studentController");

router.get("/exam", getExam); // korisnik ne treba bit logovan

router.post("/takeExam", takeExam); // treba jwt i ovdje

router.get("/questions/:examKey", getQuestions); // jer u get zahtjeve po konvenciji ne treba stavljat tijelo. Dodat jwt

router.get("/imageQuestions/:questionId", getQuestionImageObjects);

router.get("/imageQuestion/:imageQuestionId", getQuestionImage);

router.get("/pdfQuestion/:questionId", getQuestionPdf);



module.exports = router