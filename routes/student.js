var express = require('express');
var router = express.Router();
const multer  = require('multer')


var storageImages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/answers/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + ".png") //Appending extension
    }
    // path.extname(file.originalname)
  })

const uploadImages = multer({ storage: storageImages, onError : function(err, next) {
    console.log('error', err);
    next(err);
  } }) // za slike vezane za odgovore

const {getExam, takeExam, getQuestions, getQuestionImage, getQuestionPdf, getQuestionImageObjects, createAnswer, addAnswerImages,getAnswers, getImageAnswers, getAnswerImage, getQuestionImageTemporary} = require("../controllers/studentController");

router.get("/exam", getExam); // korisnik ne treba bit logovan

router.post("/takeExam", takeExam); // treba jwt i ovdje

router.get("/questions/:examKey", getQuestions); // jer u get zahtjeve po konvenciji ne treba stavljat tijelo. Dodat jwt

router.get("/imageQuestions/:questionId", getQuestionImageObjects);

router.get("/imageQuestion/:imageQuestionId", getQuestionImage);

router.get("/imageQuestionTemporary/:questionId", getQuestionImageTemporary);

router.get("/pdfQuestion/:questionId", getQuestionPdf);

router.post("/answer/:questionId/:examTakeId", createAnswer);

router.post("/answerImages", uploadImages.array("imageAnswer"), addAnswerImages);

router.get("/answers/:examTakeId", getAnswers);

router.get("/imageAnswers/:answerId", getImageAnswers);

router.get("/imageAnswer/:imageAnswerId", getAnswerImage);

module.exports = router