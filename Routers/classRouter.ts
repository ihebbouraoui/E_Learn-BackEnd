const routerClass = require("express").Router();
const classModel= require('../Models/ClassModel')
const userModel = require("../Models/userModel");
const SubjectProf=require('../Models/subjectModel')


// add new class
routerClass.post('/addNewClass', async (req: any, res: any) => {
	return await new classModel({
		title: req.body.title,
		profId:req.query._id,
	})
	.save()
	.then(
		// (rec:any) => res.status(200).json(rec._id),
		(rec: any) => setClassForUser(rec).then(
			() => res.status(200).json({'msg': "success"})
		),
		(err: any) => res.status(500).json({'msg': err})
	)
})
const setClassForUser = async (rec: any) => {
	await userModel.findByIdAndUpdate(rec.profId, {
		$push: {class: rec._id}
	})
}
//get all class
routerClass.get('/getClass',async (req:any,res:any)=>{
	return await  classModel.find().then(
		(rec:any)=>res.status(200).json(rec),
		(err:any)=>res.status(500).json({'msg':'error'})
		)
})
// add subject to class
routerClass.post('/newSubject', async (req: any, res: any) => {
	return await new SubjectProf({
		title: req.body.title,
		userId: req.query._id,
		class: req.query.class
	})
	.save()
	.then((rec: any) => setSubjectToProf(rec).then(() => setSubjectToClass(rec).then(() => res.status(200).json({'msg': 'succes'}),
		() => res.status(500).json({'msg': 'error'})
	)))
	// (rec:any) => res.status(200).json(rec._id),
})
const setSubjectToProf = async (rec: any) => {
	await userModel.findByIdAndUpdate(rec.userId, {
		$push: {subject: rec._id}
	})
}
const setSubjectToClass = async (rec: any) => {
	await classModel.findByIdAndUpdate(rec.class, {
		$push: {subject: rec._id}
	})
}

//get class
routerClass.get('/getAllClass', async (req: any, res: any) => {
	await classModel.find().populate("subject").populate("studentId").populate("profId").then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.state(500).json({'msg': err})
	)
})

module.exports = routerClass;
