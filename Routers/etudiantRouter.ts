const routerStudent = require("express").Router();
const Userr=require('../Models/userModel')

routerStudent.put('/modifier/:id', async (req:any, res:any) => {
	await Userr.findByIdAndUpdate(req.params.id, req.body).then(
		(student:any) => res.status(200).json({"msg": 'student updated successfully', student}),
		(err:any) => res.status(400).json({"msg": err})
	)
});

routerStudent.delete('/delete/:id', async (req:any, res:any) => {
	await Userr.findByIdAndDelete(req.params.id).then(
		() => res.status(200).json({"msg": 'student deleted successfully'}),
		(err:any) => res.status(400).json({"msg": err})
	)
});

routerStudent.get('/', async (req:any, res:any) => {
	await Userr.find({role:'student'}).select('-password').then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
routerStudent.get('/detail/:id', async (req:any, res:any) => {
	await Userr.findById(req.params.id).then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
routerStudent.get('/filterStudent', async (req: any, res: any) => {

	return await Userr.find({
		name: {$regex: req.query.name},
		mail: {$regex: req.query.mail},
		username: {$regex: req.query.username},
		tel: {$regex: req.query.tel},
	})
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'error'})
	})

})


module.exports = routerStudent;