import * as mongoose from "mongoose";

const { Schema } = mongoose;

const formationModel = require('mongoose');

const formationSchema = new formationModel.Schema({
	student:{type:Schema.Types.ObjectId,ref:'User'},
	prof:{type:Schema.Types.ObjectId,ref:'User'},
	announce:{type:Schema.Types.ObjectId,ref:'Announce'}
});
module.exports = formationModel.model('Formation', formationSchema)