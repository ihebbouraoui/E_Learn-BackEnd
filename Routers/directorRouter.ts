const router = require("express").Router();
const Userrr = require('../Models/userModel')
const User = require("../Models/userModel");


// update director with id
router.put('/modifier/:id', async (req: any, res: any) => {
	await Userrr.findByIdAndUpdate(req.params.id, req.body).then(
		(director: any) => res.status(200).json({"msg": 'director updated successfully', director}),
		(err: any) => res.status(400).json({"msg": err})
	)
});

//delete director with id
router.delete('/delete/:id', async (req: any, res: any) => {
	await Userrr.findByIdAndDelete(req.params.id).then(
		() => res.status(200).json({"msg": 'director deleted successfully'}),
		(err: any) => res.status(400).json({"msg": err})
	)
});
//get all director
router.get('/', async (req: any, res: any) => {
	await Userrr.find({role: 'admin',status:'true'}).select("-password").then(
		(rec: any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
// filter director
router.get('/filterDirector', async (req: any, res: any) => {
	return await Userrr.find({
		role:'admin',
		name: {$regex: req.query.name},
		mail: {$regex: req.query.mail},
		username: {$regex: req.query.username},
		tel: {$regex: req.query.tel},
	})
	.then((rec: any) => {
		if (rec) res.status(200).json(rec);
		else res.status(400).json({msg: 'non'})
	})

})
// update with mail
router.put('/updateDirector', async (req: any, res: any) => {
	const isPhone=await User.findOne({tel:req.body.tel})
	if(isPhone)
		return res.status(420).json({'msg': 'phone already exist'})
	await Userrr.findOneAndUpdate({mail: req.body.mail}, req.body).then(
		(director: any) => res.status(200).json({"msg": 'director updated successfully', director}),
		(err: any) => res.status(400).json({"msg": err})
	)
});

module.exports = router;