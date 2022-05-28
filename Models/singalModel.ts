
import * as mongoose from "mongoose";

const { Schema } = mongoose;

const signalModel = require('mongoose');

const signalSchema = new signalModel.Schema({
	userToSignal: {type:Schema.Types.ObjectId,ref:'User'},
	SignalFrom:{type:Schema.Types.ObjectId,ref:'User'},
	data:String,
	date:String,
	cause:String,

});
module.exports = signalModel.model('Signal', signalSchema)

