import * as mongoose from "mongoose";
const { Schema } = mongoose;

const mongoStudent = require('mongoose');
const studentSchema = new mongoStudent.Schema({
	name_student: String,
	mail_student: String,
	username_student: String,
	tel_student: String,

});
module.exports = mongoStudent.model('student', studentSchema)