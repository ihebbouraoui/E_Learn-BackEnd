import * as mongoose from "mongoose";

const { Schema } = mongoose;

const mongoAbonnement = require('mongoose');

const abonnementSchema = new mongoAbonnement.Schema({
	test: String,
	profId: {type:Schema.Types.ObjectId,ref:'Prof'}


});
module.exports = mongoAbonnement.model('Abonnement', abonnementSchema)