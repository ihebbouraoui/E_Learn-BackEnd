import * as mongoose from "mongoose";
const { Schema } = mongoose;
const Mongoannounce = require('mongoose');

const announceShchema = new Mongoannounce.Schema({
	date:String,
	photo:String,
	like:Number,
	whoLike:{type:Schema.Types.ObjectId,ref:'User'},
	data:String,
	category:String,
	postBy: {type:Schema.Types.ObjectId,ref:'User'},
	comment:
		{
			userId:{type:Schema.Types.ObjectId,ref:'User'},
			date:String,
			data:String
		}



});
module.exports = Mongoannounce.model('Announce', announceShchema)