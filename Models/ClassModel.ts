import * as mongoose from "mongoose";

const { Schema } = mongoose;

const Classhapter = require('mongoose');

const ClassSchema = new Classhapter.Schema({
	title: String,
	studentId: [{type:Schema.Types.ObjectId,ref:'User'}],
	profId:[{type:Schema.Types.ObjectId,ref:'User'}],
	subject:[{type:Schema.Types.ObjectId,ref:'Subject'}]
});
module.exports = Classhapter.model('Class', ClassSchema)