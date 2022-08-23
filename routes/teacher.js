var express = require('express');
var router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: './public/files' })

// za svaku od ruta treba mi middleware funkcija verifikacije jwt-a

const {validateJwt} = require("../controllers/generalController");
const {getExams, addExam, deleteExam, updateExam, addQuestion} = require("../controllers/teacherController");

router.get("/getExams", validateJwt, getExams); // promijeni naziv rute po uzoru na konvenciju koju sam skrinao

router.post("/addExam", validateJwt, addExam);

router.delete("/exam/:id", validateJwt, deleteExam);

router.put("/exam/:id", validateJwt, updateExam);

router.post("/question", validateJwt, addQuestion);

router.post("/imageUpload",upload.array("image", 10), (req,res)=>{
    console.log(req.files);
});

module.exports = router 