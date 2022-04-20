import * as mongoose from "mongoose";

const { Schema } = mongoose;

const commentModel = require('mongoose');

const commentSchema = new commentModel.Schema({
	postBy:{type:Schema.Types.ObjectId,ref:'User'},
	date:String,
	data:String,
	announceId:{type:Schema.Types.ObjectId,ref:'Announce'}
});
module.exports = commentModel.model('comment', commentSchema)