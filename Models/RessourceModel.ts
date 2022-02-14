import * as mongoose from "mongoose";

const { Schema } = mongoose;

const mongoResource = require('mongoose');

const resourceSchema = new mongoResource.Schema({
	title: String,
	userId: {type:Schema.Types.ObjectId,ref:'User'}


});
module.exports = mongoResource.model('Resource', resourceSchema)