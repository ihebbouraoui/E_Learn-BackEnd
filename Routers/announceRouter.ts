const announceRouter = require("express").Router();
const announces = require("../Models/announceModel")
const Signal = require("../Models/singalModel")
const Formation = require("../Models/formationModel")
const Category=require("../Models/category")
announceRouter.get('/getAnnounce', async (req: any, res: any) => {
	return await announces.find().populate("postBy").populate("comment.userId").populate('userSubmitted').then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})
announceRouter.get('/getAnnounceById', async (req: any, res: any) => {
	return await announces.find({postBy: req.query.postBy}).populate("postBy").populate("userSubmitted.userId").then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})

announceRouter.get('/getSignal', async (req: any, res: any) => {
	return await Signal.find().populate("userToSignal").populate("SignalFrom").then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})
announceRouter.get('/checkFormation', async (req: any, res: any) => {

	return await Formation.find({student:req.query._id}).then(
		(rec: any) =>rec.length>0 ? res.status(200).json(true) : res.status(200).json(false) ,
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})

announceRouter.post('/newAnnounce', async (req: any, res: any) => {
		return await new announces({
			postBy: req.body.postBy,
			date: req.body.date,
			photo: req.body.photo,
			like: req.body.like,
			data: req.body.data,
			category: req.body.category,
			userSubmitted:{},
			title:req.body.title,
			file:req.body.file

		})
		.save().then(
			(rec: any) => res.status(200).json(rec),
			() => res.status(500).json({'msg': 'err'})
		)
	}
)
announceRouter.post('/signal', async (req: any, res: any) => {
		return await new Signal({
			userToSignal: req.body.userToSignal,
			SignalFrom: req.body.SignalFrom,
			data: req.body.data,
			date: req.body.date,
			cause: req.body.cause
		})
		.save().then(
			(rec: any) => res.status(200).json(rec),
			() => res.status(500).json({'msg': 'err'})
		)
	}
)
announceRouter.delete('/signalDelete', async (req: any, res: any) => {
	await Signal.findByIdAndDelete(req.body.id).then(
		() => res.status(200).json({"msg": 'prof deleted successfully'}),
		(err: any) => res.status(400).json({"msg": err})
	)
});
announceRouter.put('/deleteUserFromFormation', async (req: any, res: any) => {
	return await announces.findByIdAndUpdate(req.body._id, {
		$unset: {
			userSubmitted:
				{
					userId: req.body.userId,
				}

		}
	}).then((el: any) => res.status(200).json({'msg': 'success'}), (err: any) => res.status(500).json({err}))
})
announceRouter.post('/newCategory', async (req: any, res: any) => {
		return await new Category({
			title:req.body.title,
			icon:req.body.icon
		})
		.save().then(
			(rec: any) => res.status(200).json(rec),
			() => res.status(500).json({'msg': 'err'})
		)
	}
)
announceRouter.get('/getCategory', async (req: any, res: any) => {

	return await Category.find().then(
		(rec: any) =>res.status(200).json(rec) ,
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})


announceRouter.post('/newFormation', async (req: any, res: any) => {
		return await new Formation({
			student: req.body.student,
			announce: req.body.announce,
			prof: req.body.prof,
			date:req.body.date,
			hour:req.body.hour
		})
		.save().then(
			(rec: any) => res.status(200).json(rec),
			() => res.status(500).json({'msg': 'err'})
		)
	}
)
announceRouter.get('/getMyFormationById', async (req: any, res: any) => {
	return await Formation.find({student: req.query._id}).populate("student").populate('announce').populate('prof')
	.then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})
announceRouter.get('/getProfFormation', async (req: any, res: any) => {
	return await Formation.find({prof: req.query._id}).populate("student").populate('announce').populate('prof')
	.then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})

announceRouter.put('/newCommentaire', async (req: any, res: any) => {
	return await announces.findByIdAndUpdate(req.body._id, {
		$push: {
			comment:
				{
					userId: req.body.userId,
					data: req.body.data,
					date: req.body.date
				}

		}
	}).then((el: any) => res.status(200).json({'msg': 'success'}), (err: any) => res.status(500).json({err}))
})
announceRouter.put('/submit', async (req: any, res: any) => {
	// const announce= await announces.findById(req.body._id)
	return await announces.findByIdAndUpdate(req.body._id, {
		$push: {
			userSubmitted:
				{
					userId: req.body.userId,
				}

		}
	}).then((el: any) => res.status(200).json({'msg': 'success'}), (err: any) => res.status(500).json({err}))
})
announceRouter.put('/newLike', async (req: any, res: any) => {
	return await announces.findByIdAndUpdate(req.body._id, {
		$push: {
			whoLike: req.body.userId
		},
		like: req.body.like
	}).then((el: any) => res.status(200).json({'msg': 'success'}), (err: any) => res.status(500).json({err}))
})
announceRouter.get('/ifIsLike', async (req: any, res: any) => {
	return await announces.find({
			_id: req.body._id,
			whoLike: {$regex: req.body.userId}
		},
	)
	.then((el: any) => res.status(200).json(true), (err: any) => res.status(500).json({err}))
})


module.exports = announceRouter