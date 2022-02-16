import * as mongoose from "mongoose";

const { Schema } = mongoose;

const mongoSubject = require('mongoose');

const subjectSchema = new mongoSubject.Schema({
	title: String,
	userId: {type:Schema.Types.ObjectId,ref:'User'},
	class:{type:Schema.Types.ObjectId,ref:'Class'}
});
module.exports = mongoSubject.model('Subject', subjectSchema)