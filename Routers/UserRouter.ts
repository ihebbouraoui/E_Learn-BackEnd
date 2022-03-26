import {log} from "util";

const User = require('../Models/userModel')
const rootUser = require("express").Router();
const class_model = require('../Models/ClassModel')
const subj_Model = require('../Models/subjectModel')
const todo_model = require('../Models/toDoModdel')

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
		password: hashedPassword,
		photo:req.body.photo
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})

rootUser.get('/getTodo',async (req:any,res:any)=>{
})

rootUser.get('/testGetTodo',async (req:any,res:any)=>{
	return await  todo_model.find({subject:req.query.subjectId}).then((rec:any)=>res.status(200).json(rec),
		()=>res.status(500).json({'msg':'eror'}))
})




module.exports = rootUser;
