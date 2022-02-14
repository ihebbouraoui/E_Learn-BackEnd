const Transfer = require("../Models/transferModel");
const ProfTransfer=require("../Models/profModel");
const studentTransfer=require("../Models/etudiantModel")
const Prof = require("../Models/profModel");
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
		(rec: any) => res.status(200).json(rec),
		(err: any) => res.status(500).json({'msg': err})
	)
})
rootTransfer.get('/getTransfer',async (req:any,res:any)=>{
	return await  Transfer.find().populate('vendorId').populate('PurchaserId').then(
		(rec:any)=>res.status(200).json(rec),
		(err:any)=>res.status(500).json({'msg':'error'})
	)
})

module.exports = rootTransfer;
