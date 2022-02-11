import {query} from "express";

const Prof = require('../Models/profModel');
const Abonemment = require('../Models/abonnementModel')
const rotProf = require("express").Router();

rotProf.put('/modifier/:id', async (req: any, res: any) => {
	await Prof.findByIdAndUpdate(req.params.id, req.body).then(
		(prof: any) => res.status(200).json({"msg": 'prof updated successfully', prof}),
		(err: any) => res.status(400).json({"msg": err})
	)
});

rotProf.delete('/delete/:id', async (req: any, res: any) => {
	await Prof.findByIdAndDelete(req.params.id).then(
		() => res.status(200).json({"msg": 'prof deleted successfully'}),
		(err: any) => res.status(400).json({"msg": err})
	)
});

rotProf.get('/', async (req: any, res: any) => {
	await Prof.find().then(
		(rec: any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})

rotProf.post('/addProf', async (req: any, res: any) => {
	const isEmailExist = await Prof.findOne({mail_prof: req.body.mail_prof});
	if (isEmailExist)
		return res.status(400).json({msg: 'email already exist'})

	await new Prof({
		name_prof: req.body.name_prof,
		mail_prof: req.body.mail_prof,
		tel_prof: req.body.tel_prof,
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})

rotProf.get('/filterProf', async (req: any, res: any) => {
	console.log(req.query)
	return await Prof.find({
		name_prof: {$regex: req.query.name_prof},
		mail_prof: {$regex: req.query.mail_prof},
		tel_prof: {$regex: req.query.tel_prof},
	})
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'non'})
	})

})


rotProf.post('/new', async (req: any, res: any) => {
	const prof = await Prof.findById(req.query._id)
	return await new Abonemment({
		num: req.body.num,
		duration: req.body.duration,
		value: req.body.value,
		subscribe_start: req.body.subscribe_start,
		subscribe_end: req.body.subscribe_end,
		rest_duration: req.body.rest_duration,
		profId: req.query._id
	})
	.save()
	.then(
		// (rec:any) => res.status(200).json(rec._id),
		(rec: any) => test(rec).then(
			() => res.status(200).json({'msg': "success"})
		),
		(err: any) => res.status(500).json({'msg': err})
	)
})
rotProf.get('/abon', async (req: any, res: any) => {
	await Abonemment.find().then(
		(rec: any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})

const test = async (rec: any) => {
	return await Prof.findByIdAndUpdate(rec.profId, {
		$push: {abonnement: rec._id}
	})
}
rotProf.get('/abonnement', async (req: any, res: any) => {
	await Abonemment.find().populate("profId").then(
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
	}).populate("profId")
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'non'})
		console.log(rec)
	})


})


module.exports = rotProf;