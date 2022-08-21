
// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    password: {
        type: String,
        min: [6, "Password too short"],
        required: [true, "Password is required."]
    }
}); 

// Export function to create "SomeModel" model class
module.exports = mongoose.model('User', UserSchema);