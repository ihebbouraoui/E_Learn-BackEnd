import * as mongoose from "mongoose";
const { Schema } = mongoose;

const mongoUser = require('mongoose');
const userSchema = new mongoUser.Schema({
	name: String,
	mail: String,
	username: String,
	tel: String,
	password:String,
	cin:String,
	ville:String,
	specialite:String,
	role:String,
	photo : {
		type : String
	},
			subscribe:[{type:Schema.Types.ObjectId,ref:'Abonnement'}],
	transaction:[{type:Schema.Types.ObjectId,ref:'Transfer'}],
	class:[{type:Schema.Types.ObjectId,ref:'Class'}],
	subject:[{type:Schema.Types.ObjectId,ref:'Subject'}],
	status:String,
});
module.exports = mongoUser.model('User', userSchema)