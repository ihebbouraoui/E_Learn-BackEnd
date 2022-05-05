import * as mongoose from "mongoose";
const { Schema } = mongoose;

const MessageModel = require('mongoose');

const MessageSchema = new MessageModel.Schema(
{
	// value:String,
	// sender: {
	// 	type: Schema.Types.ObjectId,
	// 	ref:'User',
	// },
	// receiver: {
	// 	type:Schema.Types.ObjectId
	// 	,ref:'User'
	// },
	messageFrom:String,
	messageTo:String,
	values:String,
	avatarFrom:String,
	avatrTo:String,
},




);

module.exports = MessageModel.model('Message', MessageSchema)

