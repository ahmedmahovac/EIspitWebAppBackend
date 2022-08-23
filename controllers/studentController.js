const ExamModel = require('../models/exam')
const ExamTakeModel = require('../models/examTake')
const QuestionModel = require('../models/question')

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