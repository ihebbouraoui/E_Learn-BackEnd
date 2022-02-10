const student = require('../Models/etudiantModel');
const routerStudent = require("express").Router();
const bcryptS = require('bcryptjs');


routerStudent.put('/modifier/:id', async (req:any, res:any) => {
	await student.findByIdAndUpdate(req.params.id, req.body).then(
		(student:any) => res.status(200).json({"msg": 'student updated successfully', student}),
		(err:any) => res.status(400).json({"msg": err})
	)
});

routerStudent.delete('/delete/:id', async (req:any, res:any) => {
	await student.findByIdAndDelete(req.params.id).then(
		() => res.status(200).json({"msg": 'student deleted successfully'}),
		(err:any) => res.status(400).json({"msg": err})
	)
});

routerStudent.get('/', async (req:any, res:any) => {
	await student.find().select('-password_student').then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
routerStudent.post('/addStudent', async (req:any, res:any) => {
	const isEmailExist = await student.findOne({mail_student : req.body.mail_student});


	if (isEmailExist)
		return res.status(400).json({msg : 'email already exist'})

	await new student({
		name_student: req.body.name_student,
		mail_student: req.body.mail_student,
		username_student: req.body.username_student,
		tel_student: req.body.tel_student,
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err:any) => res.status(500).json({'msg': err})
	)
})

routerStudent.get('/detail/:id', async (req:any, res:any) => {
	await student.findById(req.params.id).then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})

routerStudent.get('/filterStudent', async (req: any, res: any) => {

	return await student.find({
		name_student: {$regex: req.query.name_student},
		mail_student: {$regex: req.query.mail_student},
		username_student: {$regex: req.query.username_student},
		tel_student: {$regex: req.query.tel_student},
	})
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'error'})
	})

})




module.exports = routerStudent;