const {Schema, model} = require("mongoose");

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

module.exports = model("student", StudentSchema)