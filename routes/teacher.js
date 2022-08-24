var express = require('express');
var router = express.Router();
const multer  = require('multer')
const uploadImages = multer({ dest: './files/questions/images' }) // za slike vezane za sadrzaj pitanja
const uploadPdf = multer({ dest: './files/questions/pdfs' }) // za pdfove vezane za sadrzaj pitanja
// za svaku od ruta treba mi middleware funkcija verifikacije jwt-a

const {validateJwt} = require("../controllers/generalController");
const {getExams, addExam, deleteExam, updateExam, addQuestion, addImageQuestions, addPdf} = require("../controllers/teacherController");

router.get("/getExams", validateJwt, getExams); // promijeni naziv rute po uzoru na konvenciju koju sam skrinao

router.post("/addExam", validateJwt, addExam);// dodaje samo ispit i pitanja, ne slike sa pitanjima. 

router.delete("/exam/:id", validateJwt, deleteExam);

router.put("/exam/:id", validateJwt, updateExam);

router.post("/question", validateJwt, addQuestion);

router.post("/questionImages",uploadImages.array("image", 10), addImageQuestions); 

router.post("/questionPdf", uploadPdf.single("pdf"), addPdf);

module.exports = router 