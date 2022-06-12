import * as mongoose from "mongoose";


const CategoryChapter = require('mongoose');

const categorySchema = new CategoryChapter.Schema({
	title: String,
	icon:String,
});
module.exports = CategoryChapter.model('Category', categorySchema)