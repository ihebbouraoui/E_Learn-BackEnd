
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const http=require("http")
const server=http.createServer(app)
const socket=require("socket.io")
const io=require("socket.io")(server,{
	cors:{
		origin:"http://localhost:3001",
		method:["GET","¨POST"]

	}
})

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
//
io.on("connection",(socket:any)=>{
	socket.emit("me",socket.id)

	socket.on("disconnect",()=>{
		socket.broadcast.emit("callEnded")
	})
	socket.on("callUser",(data:any)=>{
		io.to(data.UserToCall).emit("callUser",{signal:data.signalData,from:data.from,name:data.name })
	})
	socket.on("answerCall",(data:any)=>{
		io.to((data.to).emit("callAccepted").data.signal)
	})
})


app.listen(3002, () => console.log("server up"));
