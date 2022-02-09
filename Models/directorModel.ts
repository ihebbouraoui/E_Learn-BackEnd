const mongoDirector = require('mongoose');
const directorSchema = new mongoDirector.Schema({
	name_Director: String,
	mail_Director: String,
	username_Director: String,
	tel_Director: String,
	password_Director: {String,select: false}
});
module.exports = mongoDirector.model('Director', directorSchema)