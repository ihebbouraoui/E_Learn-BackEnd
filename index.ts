import {Router} from "express";

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

//* ENABLE CORS
const corsOptions = {
	exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

//* Routers imports
const director = require("./Routers/directorRouter");
const prof=require("./Routers/profRouter")
const student =require('./Routers/etudiantRouter')
//* Routers middleware
app.use("/director",director);
app.use("/prof",prof)
app.use("/student",student)
//*Connect to DB
mongoose.connect(
	"mongodb+srv://iheb:21509723@cluster0.jfobh.mongodb.net/pfe?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
	(err:any) => {
		if (err) console.log("error to connect to DB" + err);
		else console.log("connected to db");
	}
);


app.listen(3002, () => console.log("server up"));
