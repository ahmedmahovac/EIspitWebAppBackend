const ExamModel = require('../models/exam')

exports.getExam = (req,res) => {
    console.log(req.query.examKey);
    ExamModel.findById(req.query.examKey, (err, exam) =>{ // nemam u bazi examKey, ovdje cu samo promijenit nacin poredjenja ako ga ubacim
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
                return res.json(exam);
        }
    });
}