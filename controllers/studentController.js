const ExamModel = require('../models/exam')
const ExamTakeModel = require('../models/examTake')
const QuestionModel = require('../models/question')
const ImageQuestionModel = require('../models/imageQuestion')
const pdfQuestionModel = require('../models/pdfQuestion')
const AnswerModel = require('../models/answer');
const ImageAnswerModel = require('../models/imageAnswer')

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
    ExamTakeModel.findOne({email: email, _examId: examKey}, (err, examTake) => { // find ne vraca null ako ne nadje, findOne vraca
        if(err){
            res.sendStatus(500);
        }
        else if(examTake !== null) {
            return res.json(examTake); // student sa ovim emailom je vec prijavljen, vidi sta ces ovdje uradit, zasad vrati isti exam
        }
        else {
            ExamTakeModel.create({firstName: firstName, lastName: lastName, email: email, index: index, _examId: examKey}, (err, examTake)=>{
                if(err) {
                    res.sendStatus(500);
                }
                else {
                    return res.json(examTake);
                }
            });
        }
    })
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

exports.getQuestionImage = (req,res) => {
    const imageQuestionId = req.params.imageQuestionId;
    ImageQuestionModel.findOne({_id: imageQuestionId}, (err, questionImage)=>{
        const destination = path.join(__dirname, "../", questionImage.imageDestionation);
        res.sendFile(destination , (err) => {
        if(!err) {
            console.log(err);   
        }
        });
    });
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


exports.getQuestionImageObjects = (req,res) => {
        ImageQuestionModel.find({_questionId: req.params.questionId}, (err, questionImages) => {
        if(err) {
            res.sendStatus(500);
        }
        // sad imam path-eve do slika
        else {
            return res.json(questionImages);
        }
    });
}

exports.createAnswer = (req,res) => {
    const {questionId, examTakeId} = req.params;
    AnswerModel.create({_examTakeId: examTakeId, _questionId: questionId}, (err, answer) => {
        if(err){
            res.sendStatus(500);
        }
        else{
            return res.json({answerId: answer._id});
        }
    });
}


exports.addAnswerImages = (req,res) => {
    const {answerId} = req.body;
    const url = "/files/answers/images/";
    req.files.map(((file,index) => {
        ImageAnswerModel.create({imageDestination: url+file.filename, _answerId: answerId}, (err,answerImage)=>{
            if(err) {
                res.sendStatus(500);
            }
            else {
                if(index===req.files.length-1) {
                    return res.json(answerImage); // zasad cu samo ovo slat kao info nazad /// ovo salje samo zadnji uploadovani
                    // ovo je nacin da znam kad je kreiranje svih answerImage uspjesno
                    // ovo salje samo zadnji kreirani answerImage nazad
                }
            }
            
        });
    }));
}



exports.getAnswers = (req,res) => {
    const {examTakeId} = req.params;
    AnswerModel.find({_examTakeId: examTakeId}, (err,answers)=> {
        if(err){
            res.sendStatus(500);
        }
        else {
            return res.json(answers);
        }
    });
}

exports.getImageAnswers = (req,res) => {
    const {answerId} = req.params;
    ImageAnswerModel.find({_answerId: answerId}, (err, imageAnswers)=>{
        if(err){
            res.sendStatus(500);
        }
        else {
            return res.json(imageAnswers);
        }
    });
}

exports.getAnswerImage = (req,res) => {
    const {imageAnswerId} = req.params;
    ImageAnswerModel.findOne({_id: imageAnswerId}, (err, answerImage)=>{
        const destination = path.join(__dirname, "../", answerImage.imageDestination);
        res.sendFile(destination , (err) => {
        if(!err) {
            console.log(err);   
        }
        });
    });
}


exports.getQuestionImageTemporary = (req,res) => {
    ImageQuestionModel.findOne({_questionId: req.params.questionId}, (err, questionImage) => {
        if(err) {
            res.sendStatus(500);
        }
        // sad imam path-eve do slika
        else {
            if(questionImage===null) {
                return res.json({});
            }
            const destination = path.join(__dirname, "../", questionImage.imageDestionation);
            res.sendFile(destination , (err) => {
            if(!err) {
                console.log(err);   
            }
            });
        }
    });
}