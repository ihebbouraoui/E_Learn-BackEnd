import * as mongoose from "mongoose";

const { Schema } = mongoose;

const mongoToDo = require('mongoose');

const toDoSchema = new mongoToDo.Schema({
	title: String,
	type:String,
	subject:{type:Schema.Types.ObjectId,ref:'Subject'},
	class:{type:Schema.Types.ObjectId,ref:'Class'},
	idProf:{type:Schema.Types.ObjectId,ref:'User'}
});
module.exports = mongoToDo.model('toDo', toDoSchema)