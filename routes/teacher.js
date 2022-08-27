var express = require('express');
var router = express.Router();
const multer  = require('multer')


var storageImages = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './files/questions/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
  })


var storagePdfs = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, './files/questions/pdfs')
},
filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
}
})

const uploadImages = multer({ storage: storageImages }) // za slike vezane za sadrzaj pitanja
const uploadPdf = multer({ storage: storagePdfs }) // za pdfove vezane za sadrzaj pitanja
// za svaku od ruta treba mi middleware funkcija verifikacije jwt-a

const {validateJwt} = require("../controllers/generalController");
const {getExams, addExam, deleteExam, updateExam, addQuestion, addImageQuestions, addPdf, getExamTakes} = require("../controllers/teacherController");

router.get("/getExams", validateJwt, getExams); // promijeni naziv rute po uzoru na konvenciju koju sam skrinao

router.post("/addExam", validateJwt, addExam);// dodaje samo ispit i pitanja, ne slike sa pitanjima. 

router.delete("/exam/:id", validateJwt, deleteExam);

router.put("/exam/:id", validateJwt, updateExam);

router.post("/question", validateJwt, addQuestion);

router.post("/questionImages",uploadImages.array("image", 10), addImageQuestions); 

router.post("/questionPdf", uploadPdf.single("pdf"), addPdf);

router.get("/examTakes/:examId", getExamTakes);

module.exports = router 