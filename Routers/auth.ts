import * as Process from "process";

const routerr = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenvv = require("dotenv");
const userModelAuth=require('../Models/userModel')
const nodemailer = require("nodemailer");
const Formation=require('../Models//formationModel')
const announce =require('../Models/announceModel')
dotenvv.config();
routerr.post('/sendMail', function (req:any, res:any) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: 'ihebbouraoui1234@gmail.com',
			pass: 'dilsgfrlhjlcjckl',

		}
	});
	let mailOptions = {
		from: req.body.from, // sender address
		to: req.body.to, // list of receivers
		subject: req.body.subject, // Subject line
		text: req.body.text, // plain text body
		html: `<b> ${req.body.html} </b>` // html body
	};

	transporter.sendMail(mailOptions, (error:any, info:any) => {
		if (error) {
			return console.log(error);
		} else {
			return res.status(200).json({ msg: "sucess" });
		}
	});
});


routerr.post("/", async (req:any, res:any) => {
	try {
		//* Validate data
		// const { error } = loginValidationn(req.body);
		// if (error) return res.status(600).json("test");

		//* check if user exist
		let user = await userModelAuth.findOne({ mail: req.body.mail });
		if (!user) return res.status(400).json({ msg: "email or password dosn't exist" });
		// check if password correct
		const isCorrectPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isCorrectPassword)
			return res.status(450).json({ msg: "incorrect email or password" });
      if (user.status==='false'){
		  return res.status(600).json({ msg: "Banned" });

	  }
		//* Generate token
		const token = jwt.sign(
			{ userId: user._id },
			'RANDOM_TOKEN_SECRET',
			);
		  if (user && isCorrectPassword && user.status==='true'){

			  res.status(200).json({
				  user: user,
				  token: token
			  });
		  }

	} catch (error) {
		res.status(400).json({msg:'try again later'});
	}
});
routerr.post("/uploads", async (req:any, res:any) => {

})
routerr.get('/getNumberProf',async (req:any, res:any) =>
	{
		await userModelAuth.count({role:'prof'}).then((rec:any)=>{
			return res.status(200).json(rec)
		})
	}
)
routerr.get('/getNumberStudent',async (req:any, res:any) =>
	{
		await userModelAuth.count({role:'student'}).then((rec:any)=>{
			return res.status(200).json(rec)
		})
	}
)
routerr.get('/getNumberFormation',async (req:any, res:any) =>
	{
		await announce.count({category:'formation'}).then((rec:any)=>{
			return res.status(200).json(rec)
		})
	}
)

routerr.get('/getNumberAnnounce',async (req:any, res:any) =>
	{
		await announce.count().then((rec:any)=>{
			return res.status(200).json(rec)
		})
	}
)



module.exports = routerr;
