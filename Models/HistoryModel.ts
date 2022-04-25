import * as mongoose from "mongoose";

const {Schema} = mongoose;
const mongoHistory = require('mongoose');

const historySchema = new mongoHistory.Schema({
	date: String,
	adminID: {type: Schema.Types.ObjectId, ref: 'User'},
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	data: {},
	type: String,
	mailUser:String,
});


module.exports = mongoHistory.model('History', historySchema)