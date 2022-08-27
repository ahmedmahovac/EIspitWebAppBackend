// Require Mongoose
const mongoose = require('mongoose');


// Define a schema
const Schema = mongoose.Schema;

const ImageAnswerSchema = new Schema({
    imageDestination: {
        type: String,
        required: [true, "Image destination must be set."]
    },
    _answerId: {
        type: Schema.Types.ObjectId,
        required: [true, "answer id must be set."],
        ref: "Answer"
    },
    createdTime: {
        type: Date,
        default: Date.now() 
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('ImageAnswer', ImageAnswerSchema);