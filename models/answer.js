
// Require Mongoose
const mongoose = require('mongoose');


// Define a schema
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    _examTakeId: {
        type: Schema.Types.ObjectId,
        required: [true, "Exam take id must be set."],
        ref: "ExamTake"
    },
    _questionId: {
        type: Schema.Types.ObjectId,
        required: [true, "Question id must be set."],
        ref: "Question"
    },
    createdTime: {
        type: Date,
        default: Date.now() // ovo ce vjv svaki put kad se pristupi dodijelit novi datum, sto nam ne treba
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('Answer', AnswerSchema);