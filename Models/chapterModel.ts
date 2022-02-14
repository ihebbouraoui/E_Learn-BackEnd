import * as mongoose from "mongoose";

const { Schema } = mongoose;

const mongoChapter = require('mongoose');

const chapterSchema = new mongoChapter.Schema({
	title: String,
	userId: {type:Schema.Types.ObjectId,ref:'User'}


});
module.exports = mongoChapter.model('Chapter', chapterSchema)