import * as mongoose from "mongoose";

const mongoprof = require('mongoose');
const { Schema } = mongoose;

const profSchema = new mongoprof.Schema({
	name_prof: String,
	mail_prof: String,
	tel_prof: String,
	abonnement:[{type:Schema.Types.ObjectId,ref:'Abonnement'}]




});
module.exports = mongoprof.model('Prof', profSchema)