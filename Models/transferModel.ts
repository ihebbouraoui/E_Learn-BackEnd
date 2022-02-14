import * as mongoose from "mongoose";
const { Schema } = mongoose;

const mongoTransfer = require('mongoose');
const TransferSchema = new mongoTransfer.Schema({
	price: String,
	ref:String,
	type: String,
	date_command: String,
	vendorId: {type:Schema.Types.ObjectId,ref:'Prof'},
	PurchaserId: {type:Schema.Types.ObjectId,ref:'student'},
	ifPurchaserProf: {type:Schema.Types.ObjectId,ref:'Prof'}


});



module.exports = mongoTransfer.model('Transfer', TransferSchema)