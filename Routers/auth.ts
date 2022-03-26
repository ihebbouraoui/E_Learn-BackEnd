const routerr = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenvv = require("dotenv");
const { loginValidationn } = require("../validation");
const { exist } = require("@hapi/joi");
const userModelAuth=require('../Models/userModel')

dotenvv.config();

routerr.post("/", async (req:any, res:any) => {
	try {
		//* Validate data
		// const { error } = loginValidationn(req.body);
		// if (error) return res.status(600).json("test");

		//* check if user exist
		let user = await userModelAuth.findOne({ mail: req.body.mail });
		if (user == null) return res.status(400).json({ msg: "email or password dosn't exist" });
		// check if password correct
		const isCorrectPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!isCorrectPassword)
			return res.status(400).json({ msg: "incorrect email or password" });

		//* Generate token
		const token = jwt.sign(
			{ userId: user._id },
			'RANDOM_TOKEN_SECRET',
			);
		res.status(200).json({
			user: user,
			token: token
		});

	} catch (error) {
		res.status(400).json({'msg':'try again later'});
	}
});

module.exports = routerr;
