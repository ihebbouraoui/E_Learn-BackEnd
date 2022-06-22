import * as fs from "fs";

const User = require('../Models/userModel')
const rootUser = require("express").Router();
const Historyy=require('../Models/HistoryModel')
const crypt = require('bcryptjs');
const formidable = require("formidable")


rootUser.post('/addUser', async (req: any, res: any) => {
	const salt = await crypt.genSalt(10);

	const isEmailExist = await User.findOne({mail: req.body.mail});
	const isPhone=await User.findOne({tel:req.body.tel})
	try{
		if (isEmailExist){
			return res.status(500).json('email already exist')
		}
	}catch (err:any){
		return res.status(500).json('email already exist')}


	if(isPhone)
		return res.status(420).json({'msg': 'phone already exist'})
	const hashedPassword = await crypt.hash(req.body.password, salt);
	await new User({
		name: req.body.name,
		mail: req.body.mail,
		username: req.body.username,
		tel: req.body.tel,
		role: req.body.role,
        specialite:req.body.specialite,
		cin:req.body.cin,
		password: hashedPassword,
		photo:req.body.photo,
		status:req.body.status,
		matricule:req.body.matricule,
		niveaux:req.body.niveaux,
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

rootUser.post('/uploadFile', async (req:any, res:any) => {
	let form = new formidable.IncomingForm();
	form.parse(req as any, async function (error:any, fields:any, file:any) {
		var newpath;
		console.log(file)
		let filepath = file.file.filepath;
		console.log(file.file.filepath)
		newpath = 'uploads/';
		newpath += file.file.originalFilename;

		//Copy the uploaded file to a custom folder
		 fs.rename(filepath as any, newpath as any, function (res:any) {
			//Send a NodeJS file upload confirmation message
			 console.log('upploadeed')
		});
      return res.status(200).json(newpath)
	})

})
// rootUser.post('/api/uploadFile',async(req,res,next)=>{
// 	// Basic setup
// 	const form=formidable.Incoming Form()
// 	const uploadFolder=path.join(__ dirname,'public','files')
// 	// Basic Configuration
// 	form.multiples
// 	form.maxFileSize
// 		=true
// 		=50*1024*1024 // 5MB
// 	form.uploadDir=uploadFolder
// 	// Parsing
// 	form.parse(req,async(err,fields,files)=>{
// 		if(err){
// 			console.log('Error parsing the files')
// 			return res.status(400).json({
// 				status:'Fail',
// 				message:'There was an error parsing the files',
// 				error:err
// 			})
// 		}
// 		// Check if multiple files orasingle file
// 		if(!files.myFile.length){
// 			// Single file
// 			const file=files.myFile
// 			// checks if the file is valid
// 			const isValid=isFileValid(file)
// 			// createsavalid name by removing spaces
// 			const fileName=encodeURIComponent(file.name.replace(/\s/g,'
// 			'))
// 			if(!isValid){
// 				// throes error if file isn't valid
// 				return res.status(400).json({
// 					status:'Fail',
// 					message:'The file type is notavalid type',
// 				})
// 			}
// 			try{
// 				// renames the file in the directory
// 				fs.renameSync(file.path,join(uploadFolder,fileName))
// 			}catch(error){
// 				console.log(error)
// 			}
// 			try{
// 				// stores the fileName in the database
// 				const newFile=await File.create({
// 					name:`files/${fileName}`
// 				})
// 				return res.status(200).json({
// 					status:'success',
// 					message:'File created successfully !!!
// 				});
// 			}catch(error){
// 				res.json({
// 					error
// 				});
// 			}
// 		}else{
// // Multiple files
// 		}
// 	})
// });

module.exports = rootUser;
