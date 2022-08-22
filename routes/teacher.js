var express = require('express');
var router = express.Router();

const ExamModel = require('../models/exam')

// za svaku od ruta treba mi middleware funkcija verifikacije jwt-a

const {validateJwt} = require("../controllers/generalController");
const {getExams, addExam, deleteExam, updateExam} = require("../controllers/teacherController");

router.get("/getExams", validateJwt, getExams); // promijeni naziv rute po uzoru na konvenciju koju sam skrinao

router.post("/addExam", validateJwt, addExam);

router.delete("/exam/:id", validateJwt, deleteExam);

router.put("/exam/:id", validateJwt, updateExam);

module.exports = router 