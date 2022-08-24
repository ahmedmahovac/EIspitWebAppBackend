// Require Mongoose
const mongoose = require('mongoose');


// Define a schema
const Schema = mongoose.Schema;

const PdfQuestionSchema = new Schema({
    pdfDestionation: {
        type: String,
        required: [true, "Pdf destination must be set."]
    },
    _questionId: {
        type: Schema.Types.ObjectId,
        required: [true, "Question id must be set."],
        ref: "Question"
    },
    createdTime: {
        type: Date,
        default: Date.now() 
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('PdfQuestion', PdfQuestionSchema);