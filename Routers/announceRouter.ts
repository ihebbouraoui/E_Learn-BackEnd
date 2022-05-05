


const announceRouter = require("express").Router();
const announces = require("../Models/announceModel")

announceRouter.get('/getAnnounce', async (req: any, res: any) => {
	return await announces.find().populate("postBy").populate("comment.userId").then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})

announceRouter.post('/newAnnounce', async (req: any, res: any) => {
		return await new announces({
			postBy: req.body.postBy,
			date:req.body.date,
			photo:req.body.photo,
			like:req.body.like,
			data:req.body.data,
			category:req.body.category

		})
		.save().then(
			(rec: any) => res.status(200).json(rec),
			() => res.status(500).json({'msg': 'err'})
		)
	}
)
announceRouter.put('/newCommentaire',async (req:any,res:any)=>{
	return await announces.findByIdAndUpdate(req.body._id,{
		$push: {
			"comment":
				{
						userId:req.body.userId,
						data:req.body.data,
						date:req.body.date
				}

		}
	}).then((el:any)=>res.status(200).json({'msg':'success'}),(err:any)=>res.status(500).json({err}))
})
announceRouter.put('/newLike',async (req:any,res:any)=>{
	return await announces.findByIdAndUpdate(req.body._id,{
		$push: {
			whoLike:req.body.userId
		},
		like:req.body.like
	}).then((el:any)=>res.status(200).json({'msg':'success'}),(err:any)=>res.status(500).json({err}))
})
announceRouter.get('/ifIsLike',async (req:any,res:any)=>{
	return await announces.find({
			_id:req.body._id,
		    whoLike:{$regex:req.body.userId}
		},
		)
	.then((el:any)=>res.status(200).json(true),(err:any)=>res.status(500).json({err}))
})


module.exports = announceRouter