import * as http from "http";

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const  {Server}=require("socket.io")
dotenv.config();

const httpServer=http.createServer(app)
//* ENABLE CORS
const corsOptions = {
	exposedHeaders: "Authorization",
};

const io = require("socket.io")(httpServer, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});
//
io.on("connection", (socket:any) => {
	socket.on("join_room", (data:any) => {
		socket.join(data);
		console.log(`User with ID: ${socket.id} joined room: ${data}`);
	});

	socket.on("send_message", (data:any) => {
		socket.to(data.room).emit("receive_message", data);
	});

	socket.on("disconnect", () => {
		console.log("User Disconnected", socket.id);
	});
});
const PORT = process.env.PORT || 3002;

// app.get('/', (req:any, res:any) => {
// 	res.send('Running');
// });
//
// io.on("connection", (socket:any) => {
// 	socket.emit("me", (socket.id))
// 	console.log(socket.id)
//
// 	socket.on("disconnect", () => {
// 		socket.broadcast.emit("callEnded")
// 	});
//
// 	socket.on("callUser", ({ userToCall, signalData, from, name }:any) => {
// 		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
// 	});
//
// 	socket.on("answerCall", (data:any) => {
// 		io.to(data.to).emit("callAccepted", data.signal)
// 	});
// });


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
const announcee=require('./Routers/announceRouter')
const message=require('./Routers/messageRoutes')
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
app.use('/announce',announcee)
app.use('/message',message)

//*Connect to DB
mongoose.connect(
	"mongodb+srv://iheb:21509723@cluster0.jfobh.mongodb.net/pfe?retryWrites=true&w=majority",
	{ useNewUrlParser: true },
	(err:any) => {
		if (err) console.log("error to connect to DB" + err);
		else console.log("connected to db");
	}
);


app.get('/', (req:any, res:any) => {
	res.send('Running');
});

io.on("connection", (socket:any) => {
	socket.emit("me", socket.id)
	console.log(socket.id)
	;

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }:any) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
		console.log('sd')
	});

	socket.on("answerCall", (data:any) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});



httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
