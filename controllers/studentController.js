const ExamModel = require('../models/exam')
const ExamTakeModel = require('../models/examTake')
const QuestionModel = require('../models/question')
const ImageQuestionModel = require('../models/imageQuestion')
const pdfQuestionModel = require('../models/pdfQuestion')

path = require('path')

exports.getExam = (req,res) => {
    const id = req.query.examKey;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        res.sendStatus(404);
    }
    else {
        ExamModel.findById(id, (err, exam) =>{ // nemam u bazi examKey, ovdje cu samo promijenit nacin poredjenja ako ga ubacim
            if(err) {
                console.log(err);
                res.sendStatus(500);
            }
            else if(!exam) {
                res.sendStatus(404);
            }
            else if(!exam.open){
                    res.sendStatus(451);
                }
            else {
                    return res.json({examKey: exam._id}); // nek frontend ima uvid da je examKey nesto razlicito od id-a, neptorebno mu je slat ostale informacije
            }
        });
    }
}


exports.takeExam = (req,res) => {
    const {firstName, lastName, email, index, examKey} = req.body;
    ExamTakeModel.create({firstName: firstName, lastName: lastName, email: email, index: index, _examId: examKey}, (err, examTake)=>{
        if(err) {
            res.sendStatus(500);
        }
        else {
            return res.json(examTake);
        }
    });
}


exports.getQuestions = (req,res) => {
    const examKey = req.params.examKey;
    QuestionModel.find({'_examId' : examKey}, (err,questions) => {
        if(err) {
            res.sendStatus(500);
        }
        else {
            return res.json(questions);
        }
    })
}

exports.getQuestionImages = (req,res) => {
    console.log("uso");
    ImageQuestionModel.find({_questionId: req.params.questionId}, (err, questionImages) => {
        if(err) {
            res.sendStatus(500);
        }
        // sad imam path-eve do slika
        else {
            questionImages.map(questionImage => {
                // sad prodji kroz svaki i pravi fajl i salji
                console.log(questionImage);
                const destination = path.join(__dirname, "../", questionImage.imageDestionation);
                res.sendFile(destination , (err) => {
                if(!err) {
                    console.log(err);   
                }
                });
            });
        }
        
    })
}


exports.getQuestionPdf = (req,res) => {
        pdfQuestionModel.findOne({_questionId: req.params.questionId}, (err, questionPdf) => {
            if(err) {
                res.sendStatus(500);
            }
            else if(questionPdf!=null){
                // sad imam path do fajla
                console.log(questionPdf);
                const destination = path.join(__dirname, "../", questionPdf.pdfDestionation);
                res.sendFile(destination , (err) => {
                if(!err) {
                    console.log(err);   
                }
                });
            }
            else {
                return res.json({});
            }
        })

}