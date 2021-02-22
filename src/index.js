import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import logger from 'morgan';
import cors from 'cors';
import commend from './commend';

// localhost 포트 설정
const port = 4000;

const app = express();
app.use(cors());
app.use(logger('dev'));

// server instance
const server = http.createServer(app);

// socketio 생성후 서버 인스턴스 사용
const io = new socketIO.Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// socketio 문법
io.on('connection', socket => {
  socket.emit('setCommend', commend);

	console.log('User connected');
	socket.on('disconnect', () => {
		console.log('User disconnect');
	});
	socket.on('init', data => {
    console.log(data.name)
    socket.emit('welcome', 'message: ' + data.name);
  });
});

server.listen(port, () => console.log(`Listening on http://localhost${port}`))