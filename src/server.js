// import express from "express";
// import path from "path";
// import { Server } from "socket.io";
// import http from "http";
// // const __dirname = path.resolve();


// const port = 3001;

// const app = express();

// // server instance
// const server = http.createServer(app);

// // socketio 생성후 서버 인스턴스 사용
// const wsServer = new Server(server);

// wsServer.on("connection", socket => {
//     socket.on("join_room", (roomName) => {
//       socket.join(roomName);
//       socket.to(roomName).emit("welcome");
//     });
//     socket.on("offer", (offer,roomName)=>{
//       socket.to(roomName).emit("offer",offer);
//     });
//     socket.on("answer", (answer,roomName)=>{
//       socket.to(roomName).emit("answer",answer);
//     });
//     socket.on("ice", (ice,roomName)=>{
//       socket.to(roomName).emit("ice",ice);
//     })
//     socket.on("message", (message, roomName)=>{
//       socket.to(roomName).emit("message", message);
//     })
//   });


//   server.listen(port, () => console.log(`Listening on port ${port}`))

