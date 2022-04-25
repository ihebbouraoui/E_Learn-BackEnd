
const User = require('../Models/userModel')
const rootUser = require("express").Router();
const Historyy=require('../Models/HistoryModel')

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
		photo:req.body.photo,
		status:req.body.status
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})
rootUser.post('/addUserToHistory', async (req: any, res: any) => {
	await new Historyy({
		date: req.body.date,
		adminID: req.body.adminID,
		userId: req.body.userId,
		data: req.body.data,
		type:req.body.type,
		mailUser:req.body.mailUser
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})

rootUser.get('/getHistory', async (req:any, res:any) => {
	await Historyy.find().populate('userId').populate('adminID').then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
rootUser.put('/blockDelete',async (req:any,res:any)=>{
	await User.findOneAndUpdate({_id:req.body._id},{status:true}).then(
		(rec:any)=>{
			if(rec) res.status(200).json(rec);
			else res.status(500).json({msg:'error'})
		}
	)
})
rootUser.delete('/deleteHistory',async (req:any,res:any)=>{
	await Historyy.findOneAndDelete({_id:req.body._id}).then(
		(rec:any)=>{
			if(rec) res.status(200).json(rec);
			else res.status(500).json({msg:'error'})
		}
	)
})
rootUser.delete('/deleteWithMail',async (req:any,res:any)=>{
	await User.findOneAndDelete({mail:req.body.mail}).then(
		(rec:any)=>{
			if(rec) res.status(200).json({msg:'succes'});
			else res.status(500).json({msg:'error'})
		}
	)
})





module.exports = rootUser;
