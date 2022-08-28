
// Require Mongoose
const mongoose = require('mongoose');


// Define a schema
const Schema = mongoose.Schema;

const AnnotationsSchema = new Schema({
    _imageAnswerId: {
        type: Schema.Types.ObjectId,
        required: [true, "_imageAnswerId must be set."],
        ref: "ImageAnswer"
    },
    createdTime: {
        type: Date,
        default: Date.now() // ovo ce vjv svaki put kad se pristupi dodijelit novi datum, sto nam ne treba
    },
    data: {
        type: String,
        required: [true, "Annotation data must be set."],
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('Annotation', AnnotationsSchema);