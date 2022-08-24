const ExamModel = require('../models/exam')
const QuestionModel = require('../models/question')
const ImageQuestionModel = require('../models/imageQuestion')


exports.getExams = (req, res) => {
    const {id} = req.body;
    // necu provjeravat jel korisnik postoji jer postoji cim je ulogovan i proslo je jwt validaciju
    ExamModel.find({'_creatorId': id},(err, exams)=>{
        if(err) {
            // ne radi baza dobro
            res.sendStatus(500);
        }
        else {
            return res.json(exams);
        }
    })
}

exports.addExam = (req,res) => {
    const {id, title, } = req.body; // id sam dodo u jwt
    ExamModel.create({title: title, _creatorId: id}, (err, exam) => {
        if(err) {
            res.sendStatus(500); // greska u bazi
        }
        else {
            return res.json(exam);            
        }
    });
}


exports.deleteExam = (req,res) => {
    const id = req.params.id;
    ExamModel.deleteOne({_id : id}, (err, dataExam) => {
        if(err) {
            res.sendStatus(500);
        }
        else {
            res.json(dataExam); // ne returnam jer ce se inace izac iz funkcije i nece se obrisat dependencies
            // izbrisi sva pitanja ovom exama
            QuestionModel.find({_examId: id}, (err,questions)=>{
                if(err){
                    res.sendStatus(500);
                }
                else {
                    QuestionModel.deleteMany({_examId: id}, (err,data)=>{
                        if(err){
                            res.sendStatus(500);
                        }
                        else {
                            questions.map((question,index)=>{
                                ImageQuestionModel.deleteMany({_questionId: question._id}, (err,data) => {
                                    if(err){
                                        res.sendStatus(500);
                                    }
                                });
                            });
                        }
                    })

                }
            });
        }
    });
}


exports.updateExam = (req,res) => {
    const id = req.params.id;
    ExamModel.findByIdAndUpdate(id, req.body, (err, data) => { // ovo data ima prijanju neupdateovanu vrijednost
        // mogu poslat neke indikatore frontendu na osnovu ovoga sto je u sadrzaju data objekta, u vidu statusa, a mogu i ovako cijeli data poslat ha ja 
        if(err) {
            res.sendStatus(500);
        }
        else {
            console.log(data);
            return res.json(data);
        }
    });
}

exports.addQuestion = (req,res) => {
    const {examId, title, text} = req.body;
        QuestionModel.create({title: title, text: text, _examId: examId}, (err,newQuestion)=>{
            if(err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                return res.json(newQuestion);
            }  
        });
}


exports.addImageQuestions = (req,res) => {
    const {questionId} = req.body;
    const url = req.protocol + '://' + req.get('host') + "/files/questions/images/";
    req.files.map(((file,index) => {
        ImageQuestionModel.create({imageDestionation: url+file.filename, _questionId: questionId}, (err,questionImage)=>{
            if(err) {
                res.sendStatus(500);
            }
            else {
                console.log(questionImage);
                if(index===req.files.length-1) {
                    return res.json(questionImage); // zasad cu samo ovo slat kao info nazad
                    // ovo je nacin da znam kad je kreiranje svih imagequestiona uspjesno
                }
            }
            
        });
    }));

}


exports.addPdf = (req,res) => {

}