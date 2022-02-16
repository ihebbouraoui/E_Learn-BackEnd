const Transfer = require("../Models/transferModel");
const userTransfer = require("../Models/userModel");
const rootTransfer = require("express").Router();
rootTransfer.post('/new', async (req: any, res: any) => {
	return await new Transfer({
		ref: req.body.ref,
		price: req.body.price,
		date_command: req.body.date_command,
		type: req.body.type,
		vendorId:req.query.vendorId,
		PurchaserId:req.query.PurchaserId
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
rootTransfer.get('/getTransfer',async (req:any,res:any)=>{
	return await  Transfer.find().populate('vendorId').populate('PurchaserId').then(
		(rec:any)=>res.status(200).json(rec),
		(err:any)=>res.status(500).json({'msg':'error'})
	)
})
const test = async (rec: any) => {
	return  await userTransfer.findByIdAndUpdate(rec.vendorId, {
		$push: {transaction: rec._id}
	}),
		await userTransfer.findByIdAndUpdate(rec.PurchaserId,{
			$push:{transaction:rec._id}
		})


}

rootTransfer.get('/get',async (req:any,res:any)=>{
	return await  Transfer.find().then(
		(rec:any)=>res.status(200).json(rec),
		(err:any)=>res.status(500).json({'msg':'error'})
	)
})

module.exports = rootTransfer;
