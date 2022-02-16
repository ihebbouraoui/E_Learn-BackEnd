const User = require('../Models/userModel')
const rootUser = require("express").Router();
const testClass = require('../Models/ClassModel')
const crypt = require('bcryptjs');

rootUser.post('/addUser', async (req: any, res: any) => {
	const isEmailExist = await User.findOne({mail: req.body.mail});
	if (isEmailExist)
		return res.status(400).json({msg: 'email already exist'})

	const salt = await crypt.genSalt(10);
	const hashedPassword = await crypt.hash(req.body.password, salt);

	await new User({
		name: req.body.name,
		mail: req.body.mail,
		username: req.body.username,
		tel: req.body.tel,
		role: req.body.role,
		password: hashedPassword
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})
//test add student
rootUser.post('/addStudent', async (req: any, res: any) => {
	const isEmailExist = await User.findOne({mail: req.body.mail});
	if (isEmailExist)
		return res.status(400).json({msg: 'email already exist'})

	const salt = await crypt.genSalt(10);
	const hashedPassword = await crypt.hash(req.body.password, salt);

	await new User({
		name: req.body.name,
		mail: req.body.mail,
		username: req.body.username,
		tel: req.body.tel,
		class: req.query.class,
		role: req.body.role,
		password: hashedPassword
	})
	.save()
	.then(
		(rec:any)=>studentToClass(rec).then(()=>res.status(200).json({'msg':'succes'}),

			(err:any)=>res.status(500).json({'msg':'error'})
			)
	)
})
const studentToClass = async (rec: any) => {

	await testClass.findByIdAndUpdate(rec.class, {
		$push: {studentId: rec._id}

	})


}
module.exports = rootUser;
