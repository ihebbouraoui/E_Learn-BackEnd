const routerClass = require("express").Router();
const classModel = require('../Models/ClassModel')
const userModel = require("../Models/userModel");


// add new class
routerClass.post('/addNewClass', async (req: any, res: any) => {
	return await new classModel({
		title: req.body.title,
	})
	.save()
	.then(
		(rec: any) =>
			() => res.status(200).json({'msg': "success"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})


//get all class
routerClass.get('/getClass', async (req: any, res: any) => {
	return await classModel.find().then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})
//add student to class (relation) many to one

routerClass.put('/setStudentToClass',async (req:any,res:any)=>{
	return await classModel.findByIdAndUpdate(req.query._id,{
		$push: {
			student:req.query.studentId
		}
	}).then(async (rec:any)=>  userModel.findByIdAndUpdate(req.query.studentId,{
		$push:{class:rec._id}
	})).then(()=>res.status(200).json({'msg':'add'}),()=>res.status(500).json({'msg':"error"}))
})

//add prof to class (relation) many to one
routerClass.put('/setProfToClass',async (req:any,res:any)=>{
	return await classModel.findByIdAndUpdate(req.query._id,{
		$push: {
			prof:req.query.profId
		}
	}).then(async (rec:any)=> userModel.findByIdAndUpdate(req.query.profId,{
		$push:{class:rec._id}
	})).then((el:any)=>res.status(200).json({'msg':'add'}),()=>res.status(500).json({'msg':"error"}))
})

routerClass.get('/getClassByIdStudent',async (req:any,res:any)=>{
	return await  classModel.findOne({student:req.query._id})
	.then(
		(rec:any)=>res.status(200).json(rec),
		()=>res.status(500).json({'msg':'error'})
	)
})
routerClass.get('/getClassByIdProf',async (req:any,res:any)=>{
	return await  classModel.find({prof:req.query.id_Prof}).then(
		(rec:any)=>res.status(200).json(rec),
		()=>res.status(500).json({'msg':'error'})
	)
})

routerClass.get('/getMySubject',async (req:any,res:any)=>{
	return await  classModel.findOne({student:req.query._id},{subject:1,_id:0}).populate('subject')
	.then(
		(rec:any)=>res.status(200).json(rec),
		()=>res.status(500).json({'msg':'error'})
	)
})






module.exports = routerClass;
