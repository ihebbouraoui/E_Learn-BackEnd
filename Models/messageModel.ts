import * as mongoose from "mongoose";
const { Schema } = mongoose;

const MessageModel = require('mongoose');

const MessageSchema = new MessageModel.Schema(
{
	message: {
		text:String,
		date:String
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref:'User',
	},
	receiver: {
		type:Schema.Types.ObjectId
		,ref:'User'
	},
},
);

module.exports = MessageModel.model('Message', MessageSchema)

