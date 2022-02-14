import * as mongoose from "mongoose";
const { Schema } = mongoose;

const mongoUser = require('mongoose');
const userSchema = new mongoUser.Schema({
	name: String,
	mail: String,
	username: String,
	tel: String,
	password:String,
	role:String,
	subscribe:[{type:Schema.Types.ObjectId,ref:'Abonnement'}],

});
module.exports = mongoUser.model('User', userSchema)