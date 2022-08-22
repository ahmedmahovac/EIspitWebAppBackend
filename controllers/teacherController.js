const ExamModel = require('../models/exam')

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
    const {id, title} = req.body;
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
    ExamModel.deleteOne({_id : id}, (err, data) => {
        if(err) {
            res.sendStatus(500);
        }
        else {
            return res.json(data);
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