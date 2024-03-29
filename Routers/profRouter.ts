const Abonemment = require('../Models/abonnementModel')
const UserModel = require('../Models/userModel')
const rotProf = require("express").Router();



// Crud Prof

rotProf.put('/modifier/:id', async (req: any, res: any) => {
	await UserModel.findByIdAndUpdate(req.params.id, req.body)
	.then(
		(prof: any) => res.status(200).json(prof),
		(err: any) => res.status(400).json({"msg": err})
	)
});



rotProf.delete('/delete/:id', async (req: any, res: any) => {
	await UserModel.findByIdAndDelete(req.params.id).then(

		() => res.status(200).json({"msg": 'prof deleted successfully'}),
		(err: any) => res.status(400).json({"msg": err})
	)
	.save()
});

rotProf.get('/', async (req: any, res: any) => {
	await UserModel.find({role: 'prof'}).populate('subject').then(
		(rec: any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
rotProf.get('/prof', async (req: any, res: any) => {
	await UserModel.find({role: 'prof',status:true}).populate('subject').then(
		(rec: any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
rotProf.get('/filterProf', async (req: any, res: any) => {
	return await UserModel.find({
		role:'prof',

		name: {$regex: req.query.name},
		mail: {$regex: req.query.mail},
		tel: {$regex: req.query.tel},
	})
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'non'})
	})

})

rotProf.get('/detail', async (req: any, res: any) => {
	await UserModel.findById(req.query._id).then(
		(prof: any) => res.status(200).json({ prof}),
		(err: any) => res.status(400).json({"msg": err})
	)
});



// Prof Subscribe
rotProf.post('/new', async (req: any, res: any) => {
	return await new Abonemment({
		num: req.body.num,
		duration: req.body.duration,
		value: req.body.value,
		subscribe_start: req.body.subscribe_start,
		subscribe_end: req.body.subscribe_end,
		rest_duration: req.body.rest_duration,
		userId: req.query._id
	})
	.save()
	.then(
		// (rec:any) => res.status(200).json(rec._id),
		(rec: any) => setSubscribeUser(rec).then(
			() => res.status(200).json({'msg': "success"})
		),
		(err: any) => res.status(500).json({'msg': err})
	)
})
const setSubscribeUser = async (rec: any) => {
	await UserModel.findByIdAndUpdate(rec.userId, {
		$push: {subscribe: rec._id}
	})
}

rotProf.get('/abonnement', async (req: any, res: any) => {
	await Abonemment.find().populate("userId").then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.state(500).json({'msg': err})
	)

})

rotProf.get('/filterAbonnement', async (req: any, res: any) => {
	return await Abonemment.find({

		num: {$regex: req.query.num},
		duration: {$regex: req.query.duration},
		value: {$regex: req.query.value},
		subscribe_start: {$regex: req.query.subscribe_start},
		subscribe_end: {$regex: req.query.subscribe_end},
		rest_duration: {$regex: req.query.rest_duration},
	}).populate("userId")
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'non'})
		console.log(rec)
	})
})
rotProf.put('/delete/prof', async (req: any, res: any) => {
	await UserModel.findByIdAndUpdate({_id:req.body._id},{status:false}).then(
		(prof: any) => res.status(200).json({"msg": 'prof updated successfully'}),
		(err: any) => res.status(400).json({"msg": err})
	)
});






module.exports = rotProf;