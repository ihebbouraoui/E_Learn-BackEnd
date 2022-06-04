import * as Process from "process";

const routerr = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenvv = require("dotenv");
const userModelAuth=require('../Models/userModel')
const nodemailer = require("nodemailer");

dotenvv.config();
routerr.post('/sendMail', function (req:any, res:any) {
	async function myCustomMethod(ctx:any){
		let cmd = await ctx.sendCommand(
			'AUTH PLAIN ' +
			Buffer.from(
				'\u0000' + ctx.auth.credentials.user + '\u0000' + ctx.auth.credentials.pass,
				'utf-8'
			).toString('base64')
		);

		if(cmd.status < 200 || cmd.status >=300){
			throw new Error('Failed to authenticate user: ' + cmd.text);
		}
	}
	let transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			type: 'custom',
			method: 'MY-CUSTOM-METHOD', // forces Nodemailer to use your custom handler
			user: 'username',
			pass: 'verysecret',
			options: {
				clientId: 'verysecret',
				applicationId: 'my-app'
			}

		},
		customAuth: {
			'MY-CUSTOM-METHOD': myCustomMethod
		}
	});
	let mailOptions = {
		from: 'ihebbouraoui1234@gmail.com', // sender address
		to: 'ihebbouraoui1234@gmail.com', // list of receivers
		subject: 'ihebbouraoui1234@gmail.com', // Subject line
		text: 'ihebbouraoui1234@gmail.com', // plain text body
		html: '<b>NodeJS Email Tutorial</b>' // html body
	};

	transporter.sendMail(mailOptions, (error:any, info:any) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s', info.messageId, info.response);
		res.render('index');
	});
});

routerr.post("/", async (req:any, res:any) => {
	try {
		//* Validate data
		// const { error } = loginValidationn(req.body);
		// if (error) return res.status(600).json("test");

		//* check if user exist
		let user = await userModelAuth.findOne({ mail: req.body.mail });
		console.log(user.status)
		if (!user) return res.status(400).json({ msg: "email or password dosn't exist" });
		// check if password correct
		const isCorrectPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isCorrectPassword)
			return res.status(400).json({ msg: "incorrect email or password" });
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
		res.status(400).json({'msg':'try again later'});
	}
});

module.exports = routerr;
