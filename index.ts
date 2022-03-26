
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
const prof=require("./Routers/profRouter");
const student =require('./Routers/etudiantRouter');
const transfer=require('./Routers/TransferRouter');
const user=require('./Routers/UserRouter')
const classRoute=require('./Routers/classRouter')
const toDoRoute=require('./Routers/toDoRouter')
const SubjectRoute=require('./Routers/subjectRouter')
const auth=require('./Routers/auth')
//* Routers middleware
app.use("/director",director);
app.use("/prof",prof)
app.use("/student",student)
app.use("/transfer",transfer)
app.use('/user',user)
app.use('/class',classRoute)
app.use('/toDo',toDoRoute)
app.use('/subject',SubjectRoute)
app.use('/login',auth)
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
