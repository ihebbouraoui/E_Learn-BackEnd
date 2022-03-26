const rootSubject = require("express").Router();
const subjectModel = require('../Models/subjectModel')
const class_Model = require('../Models/ClassModel')
const prof_Model = require('../Models/userModel')

rootSubject.post('/addSubject', async (req: any, res: any) => {
		return await new subjectModel({
			title: req.body.title,
			profId:req.query.id_Prof,
			class:req.query.id_Class
		})
		.save().then(
			(rec: any) => res.status(200).json(rec),
			() => res.status(500).json({'msg': 'err'})
		)
	}
)

rootSubject.get('/getSubject', async (req: any, res: any) => {
	await subjectModel.find().then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.state(500).json({'msg': err})
	)
})
// add subject to class and prof who will give it
rootSubject.put('/setSubjectToCLass', async (req: any, res: any) => {
	return await class_Model.findByIdAndUpdate(req.query._id, {
		$push: {
			subject: req.query.subjectId
		}
	}).then(async (rec: any) => subjectModel.findByIdAndUpdate(req.query.subjectId, {
		$push: {class: rec._id, profId: req.query.profId}
	})).then(async (rec: any) => prof_Model.findByIdAndUpdate(req.query.profId, {
		$push: {subject: req.query.subjectId}
	})).then(() => res.status(200).json({'msg': 'add'}), () => res.status(500).json({'msg': 'error'}))
})
//set prof id to subject
rootSubject.put('/modifySubject', async (req: any, res: any) => {
	return await subjectModel.findByIdAndUpdate(req.query._id, {
		$push: {
			profId: req.query.profId
		}
	}).then(() => res.status(200).json({'msg': 'add'}), () => res.status(500).json({'msg': 'error'}))
})


rootSubject.get('/getSubjectProfByClass', async (req: any, res: any) => {
	await subjectModel.find({profId:req.query.id_Prof}).populate('class').populate('profId').then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.state(500).json({'msg': err})
	)
})

module.exports = rootSubject;
