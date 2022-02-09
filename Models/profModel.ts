const mongoprof = require('mongoose');
const profSchema = new mongoprof.Schema({
	name_prof: String,
	mail_prof: String,
	tel_prof: Number,
});
module.exports = mongoprof.model('Prof', profSchema)