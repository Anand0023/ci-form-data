const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    option: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: false,
    },
    
});

employeeSchema.index({ email: 1 }, { unique: true });
employeeSchema.index({ phone: 1 }, { unique: true });

const Register = mongoose.model('Register', employeeSchema);

module.exports = Register;
