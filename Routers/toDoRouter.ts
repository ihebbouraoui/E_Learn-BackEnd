const toDo = require("express").Router();
const toDoTest = require('../Models/toDoModdel')
const subjectModelTest = require('../Models/subjectModel')


toDo.post('/newToDo', async (req: any, res: any) => {
	return await new toDoTest({
		title: req.body.title,
		type: req.body.type,
		subject: req.query.idSubject,
		class:req.query.id_Class,
		idProf:req.query.id_Prof
	})
	.save().then(
		(rec: any)=>res.status(200).json({'msg':'done'}),
		() => res.status(500).json({'msg':'not'})
	)})
//set TO do to Subject


	toDo.get('/getToDoTest', async (req: any, res: any) => {
		return await toDoTest.find({
			type:'test',
			class:req.query.id_Class
		}).populate('subject').populate('idProf')
		.then(
			(rec: any) => res.status(200).json(rec),
			() => res.status(500).json({'msg': 'error'})
		)
	})


toDo.get('/getToDoExam', async (req: any, res: any) => {
	return await toDoTest.find({
		type:'exam',
		class:req.query.id_Class
	}).populate('subject').populate('idProf')
	.then(
		(rec: any) => res.status(200).json(rec),
		() => res.status(500).json({'msg': 'error'})
	)
})


toDo.get('/getProfToDoTest', async (req: any, res: any) => {
	return await toDoTest.find({
		type:'test',
		idProf:req.query.id_Prof
	}).populate('subject').populate('idProf').populate('class')
	.then(
		(rec: any) => res.status(200).json(rec),
		() => res.status(500).json({'msg': 'error'})
	)
})
toDo.get('/getProfToDoExam', async (req: any, res: any) => {
	return await toDoTest.find({
		type:'exam',
		idProf:req.query.id_Prof
	}).populate('subject').populate('idProf').populate('class')
	.then(
		(rec: any) => res.status(200).json(rec),
		() => res.status(500).json({'msg': 'error'})
	)
})




	module.exports = toDo;




