import * as mongoose from "mongoose";

const { Schema } = mongoose;

const mongoAbonnement = require('mongoose');

const abonnementSchema = new mongoAbonnement.Schema({
	num: String,
	duration:String,
	value:String,
	subscribe_start:String,
	subscribe_end:String,
	rest_duration:String,
	userId: {type:Schema.Types.ObjectId,ref:'User'}


});
module.exports = mongoAbonnement.model('Abonnement', abonnementSchema)