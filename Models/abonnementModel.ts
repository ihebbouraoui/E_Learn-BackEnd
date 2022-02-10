const mongoose = require("mongoose");

const mongoAbonnement = require('mongoose');
const mongoproff = require("mongoose");
const { Schema } = mongoose;

const abonnementSchema = new mongoAbonnement.Schema({
	test: String,
	profId: String


});
module.exports = mongoAbonnement.model('Abonnement', abonnementSchema)