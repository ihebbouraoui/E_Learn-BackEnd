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
	transaction:[{type:Schema.Types.ObjectId,ref:'Transfer'}],
	chapter:[{type:Schema.Types.ObjectId,ref:'Chapter'}],
	resource:[{type:Schema.Types.ObjectId,ref:'Resource'}]
});
module.exports = mongoUser.model('User', userSchema)