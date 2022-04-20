

const announceRouter = require("express").Router();
const announce = require("../Models/announceModel")

announceRouter.get('/getAnnounce', async (req: any, res: any) => {
	return await announce.find().populate('postBy').then(
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': 'error'})
	)
})