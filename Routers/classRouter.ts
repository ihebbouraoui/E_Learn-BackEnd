const routerClass = require("express").Router();
const classModel= require('../Models/ClassModel')
const userModel = require("../Models/userModel");
const SubjectProf=require('../Models/subjectModel')


// add new class
routerClass.post('/addNewClass', async (req: any, res: any) => {
	return await new classModel({
		title: req.body.title,
	})
	.save()
	.then(
		// (rec:any) => res.status(200).json(rec._id),
		(rec: any) =>
			() => res.status(200).json({'msg': "success"}),
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
//add student / prof to class

routerClass.put('/classRelation',async (req:any,res:any)=>{
	await classModel.findByIdAndUpdate(req.query._id, {
		$push: {
			studentId: req.query.studentId,
			profId: req.query.profId
		}
		// }).then((rec:any)=>res.status(200).json({'msg':'Succes'}),()=>res.status(500).json({'msg':'error'}))
	}).then((rec:any)=>setClassToProf(rec).then(()=>setClassToStudent(rec).then((recF:any)=>res.status(200).json({'msg':'ok'}))))
})

const setClassToProf=async (rec:any)=>{
	await userModel.findByIdAndUpdate(rec.profId,{
		$push: {class: rec._id}
	})
}
const setClassToStudent=async (rec:any)=>{
	await userModel.findByIdAndUpdate(rec.studentId,{
		$push: {class: rec._id}
	})
}




routerClass.post('/newSubject', async (req: any, res: any) => {
	return await new SubjectProf({
		title: req.body.title,

	})
	.save().then(
		(rec:any)=>res.status(200).json(rec),
		()=>res.status(500).json({'msg':'err'})
	)}
)
//subject realtion
routerClass.put('/subjectRelation',async (req:any,res:any)=>{
	 await SubjectProf.findByIdAndUpdate(req.query._id, {
		$push: {
			userId: req.query.userId,
			class: req.query.class
		}
		// }).then((rec:any)=>res.status(200).json({'msg':'Succes'}),()=>res.status(500).json({'msg':'error'}))
	}).then((rec:any)=>setSubjectToClass(rec).then(()=>setSubjectToProf(rec).then((recF:any)=>res.status(200).json({'msg':'ok'}))))
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
//get subject
routerClass.get('/getSubject', async (req: any, res: any) => {
	await SubjectProf.find().populate('userId').populate('class').then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.state(500).json({'msg': err})
	)
})

//get class
routerClass.get('/getAllClass', async (req: any, res: any) => {
	await classModel.find().populate("subject").populate("studentId").populate("profId").then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.state(500).json({'msg': err})
	)
})

module.exports = routerClass;
