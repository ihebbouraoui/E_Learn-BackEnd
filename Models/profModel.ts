import * as mongoose from "mongoose";

const mongoprof = require('mongoose');
const { Schema } = mongoose;

const profSchema = new mongoprof.Schema({
	name_prof: String,
	mail_prof: String,
	tel_prof: String,






});
module.exports = mongoprof.model('Prof', profSchema)