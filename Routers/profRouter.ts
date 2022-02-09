const Prof = require('../Models/profModel');
const rotProf = require("express").Router();

rotProf.put('/modifier/:id', async (req:any, res:any) => {
	await Prof.findByIdAndUpdate(req.params.id, req.body).then(
		(prof:any) => res.status(200).json({"msg": 'prof updated successfully', prof}),
		(err:any) => res.status(400).json({"msg": err})
	)
});

rotProf.delete('/delete/:id', async (req:any, res:any) => {
	await Prof.findByIdAndDelete(req.params.id).then(
		() => res.status(200).json({"msg": 'prof deleted successfully'}),
		(err:any) => res.status(400).json({"msg": err})
	)
});

rotProf.get('/', async (req:any, res:any) => {
	await Prof.find().then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})

rotProf.post('/addProf', async (req:any, res:any) => {
	const isEmailExist = await Prof.findOne({mail_prof : req.body.mail_prof});
	if (isEmailExist)
		return res.status(400).json({msg : 'email already exist'})

	await new Prof({
		name_prof: req.body.name_prof,
		mail_prof: req.body.mail_prof,
		tel_prof: req.body.tel_prof,
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err:any) => res.status(500).json({'msg': err})
	)
})



module.exports = rotProf;