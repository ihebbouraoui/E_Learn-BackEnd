const User = require('../Models/userModel')
const rootUser = require("express").Router();
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
		role:req.body.role,
		password: hashedPassword
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})





module.exports = rootUser;
