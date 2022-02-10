const Director = require('../Models/directorModel');
const router = require("express").Router();
const bcrypt = require('bcryptjs');

router.post('/addDirector', async (req: any, res: any) => {
	const isEmailExist = await Director.findOne({mail_Director: req.body.mail_Director});
	if (isEmailExist)
		return res.status(400).json({msg: 'email already exist'})

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password_Director, salt);

	await new Director({
		name_Director: req.body.name_Director,
		mail_Director: req.body.mail_Director,
		username_Director: req.body.username_Director,
		tel_Director: req.body.tel_Director,
		password_Director: hashedPassword
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})

router.put('/modifier/:id', async (req: any, res: any) => {
	await Director.findByIdAndUpdate(req.params.id, req.body).then(
		(director: any) => res.status(200).json({"msg": 'director updated successfully', director}),
		(err: any) => res.status(400).json({"msg": err})
	)
});

router.delete('/delete/:id', async (req: any, res: any) => {
	await Director.findByIdAndDelete(req.params.id).then(
		() => res.status(200).json({"msg": 'director deleted successfully'}),
		(err: any) => res.status(400).json({"msg": err})
	)
});

router.get('/', async (req: any, res: any) => {
	await Director.find().select("-password_Director").then(
		(rec: any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})

router.get('/filterDirector', async (req: any, res: any) => {
	console.log(req.query)

	return await Director.find({
		// { $or:[{  name_Director:req.body.name_Director }] },
		// { $or:[{  mail_Director:req.body.mail_Director }] },
		// { $or:[{  username_Director:req.body.username_Director }] },
		// { $or:[{  tem_Director:req.body.tem_Director }] },
		name_Director: {$regex: req.query.name_Director},
		mail_Director: {$regex: req.query.mail_Director},
		username_Director: {$regex: req.query.username_Director},
		tel_Director: {$regex: req.query.tel_Director},
	})
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'non'})
	})

})


module.exports = router;