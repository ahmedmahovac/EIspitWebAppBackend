
// Require Mongoose
const mongoose = require('mongoose');


// Define a schema
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String
    },
    text: {
        type: String
    },
    // jos kako cu dodat pdf, slike
    _examId: {
        type: Schema.Types.ObjectId,
        required: [true, "Exam id must be set."],
        ref: "Exam"
    },
    createdTime: { // nek stoji ovako, necu iskoristit nizasta al moze bit korisna informacija
        type: Date,
        default: Date.now() 
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('Question', QuestionSchema);