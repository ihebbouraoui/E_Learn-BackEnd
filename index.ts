import * as http from "http";
const UserModelTest=require('../backend/Models/userModel')
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const  {Server}=require("socket.io")
dotenv.config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static("uploads"));

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
	});

	socket.on("answerCall", (data:any) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});
const jwt = require("jsonwebtoken");

let refreshTokens = <any>[];

app.post("/api/refresh", (req:any, res:any) => {
	//take the refresh token from the user
	const refreshToken = req.body.token;

	//send error if there is no token or it's invalid
	if (!refreshToken) return res.status(401).json("You are not authenticated!");
	if (!refreshTokens.includes(refreshToken)) {
		return res.status(403).json("Refresh token is not valid!");
	}
	jwt.verify(refreshToken, "myRefreshSecretKey", (err:any, user:any) => {
		err && console.log(err);
		refreshTokens = refreshTokens.filter((token:any) => token !== refreshToken);

		const newAccessToken = generateAccessToken(user);
		const newRefreshToken = generateRefreshToken(user);

		refreshTokens.push(newRefreshToken);

		res.status(200).json({
			accessToken: newAccessToken,
			refreshToken: newRefreshToken,
		});
	});

	//if everything is ok, create new access token, refresh token and send to user
});

const generateAccessToken = (user:any) => {
	return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "mySecretKey", {
		expiresIn: "5s",
	});
};

const generateRefreshToken = (user:any) => {
	return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

app.post("/api/login", (req:any, res:any) => {
	const { username, password } = req.body;
	const user = UserModelTest.find((u:any) => {
		return u.username === username && u.password === password;
	});
	if (user) {
		//Generate an access token
		const accessToken = generateAccessToken(user);
		const refreshToken = generateRefreshToken(user);
		refreshTokens.push(refreshToken);
		res.json({
			username: user.username,
			isAdmin: user.isAdmin,
			accessToken,
			refreshToken,
		});
	} else {
		res.status(400).json("Username or password incorrect!");
	}
});

const verify = (req:any, res:any, next:any) => {
	const authHeader = req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split(" ")[1];

		jwt.verify(token, "mySecretKey", (err:any, user:any) => {
			if (err) {
				return res.status(403).json("Token is not valid!");
			}

			req.user = user;
			next();
		});
	} else {
		res.status(401).json("You are not authenticated!");
	}
};

app.delete("/api/users/:userId", verify, (req:any, res:any) => {
	if (req.user.id === req.params.userId || req.user.isAdmin) {
		res.status(200).json("User has been deleted.");
	} else {
		res.status(403).json("You are not allowed to delete this user!");
	}
});

app.post("/api/logout", verify, (req:any, res:any) => {
	const refreshToken  = req.body.token;
	 refreshTokens = refreshTokens.filter((token:any) => token !== refreshToken);
	res.status(200).json("You logged out successfully.");
});



app.use('/uploads',express.static('uploads'));
httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
