
// Require Mongoose
const mongoose = require('mongoose');


// Define a schema
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    title: {
        type: String
    },
    open: {
        type: Boolean,
        default: false
    },
    _creatorId: {
        type: Schema.Types.ObjectId,
        required: [true, "Creator id must be set."],
        ref: "User"
    },
    insightOpen: {
        type:Boolean,
        default: false
    },
    createdTime: {
        type: Date,
        default: Date.now() // ovo ce vjv svaki put kad se pristupi dodijelit novi datum, sto nam ne treba
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('Exam', ExamSchema);