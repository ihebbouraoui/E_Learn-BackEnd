
const routerMessage = require("express").Router();
const messageModel = require('../Models/messageModel')
routerMessage.post('/newMessage', async (req:any, res:any) => {
	await new messageModel({
		value:req.body.value,
		sender:req.body.sender,
		receiver:req.body.receiver,
	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})
routerMessage.post('/testMessage', async (req:any, res:any) => {
	await new messageModel({
		messageFrom:req.body.messageFrom,
		messageTo:req.body.messageTo,
		values:req.body.values,
		avatarFrom:req.body.avatarFrom,
		avatarTo:req.body.avatarTo,

	})
	.save()
	.then(
		() => res.status(200).json({'msg': "add"}),
		(err: any) => res.status(500).json({'msg': err})
	)
})
routerMessage.get('/', async (req:any, res:any) => {
	await messageModel.find().then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})
routerMessage.get('/getMyMessage', async (req:any, res:any) => {
	await messageModel.find({sender:req.body.sender }).populate('receiver').then(
		(rec:any) => {
			if (rec) res.status(200).json(rec);
			else res.status(400).json({msg: 'error'})
		}
	)
})


module.exports = routerMessage;