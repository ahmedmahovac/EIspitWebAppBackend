

const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const AnnotationsSchema = new Schema({
    _imageAnswerId: {
        type: Schema.Types.ObjectId,
        required: [true, "_imageAnswerId must be set."],
        ref: "ImageAnswer"
    },
    createdTime: {
        type: Date,
        default: Date.now() 
    },
    data: {
        type: String,
        required: [true, "Annotation data must be set."],
    }
}); 


module.exports = mongoose.model('Annotation', AnnotationsSchema);