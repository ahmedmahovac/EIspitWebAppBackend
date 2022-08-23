// Require Mongoose
const mongoose = require('mongoose');


// Define a schema
const Schema = mongoose.Schema;

const ExamTakeSchema = new Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    index: {
        type: String
    },
    _examId: {
        type: Schema.Types.ObjectId,
        required: [true, "Exam id must be set."],
        ref: "Exam"
    },
    examStartedAt: {
        type: Date,
        default: Date.now() // ovo moze bit korisna informacija
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('ExamTake', ExamTakeSchema);