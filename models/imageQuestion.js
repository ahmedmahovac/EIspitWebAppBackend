
const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const ImageQuestionSchema = new Schema({
    imageDestionation: {
        type: String,
        required: [true, "Image destination must be set."]
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

module.exports = mongoose.model('ImageQuestion', ImageQuestionSchema);