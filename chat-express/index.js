const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// 跟踪消息定时器的Map 
const messageTimers = new Map();

const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
  cors :{
    origin: "http://localhost:3000"
  }
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    console.log('Received message: ' + msg);
    const userMessage = JSON.parse(msg);

    // 清除定时器
    for (const [id, timer] of messageTimers) {
      clearTimeout(timer);
    }
    messageTimers.clear();

    // 将信息广播给所有连接的客户端
    io.emit('message', JSON.stringify(userMessage));

    const messageId = userMessage.username;
    // 模拟机器人回复
    const timer = setTimeout(() => {
      const robotResponse = { username: 'Robot', text: "This is an automated response to the last message." };
      io.emit('message', JSON.stringify(robotResponse));
      messageTimers.delete(messageId); // 发送之后清除定时器
    }, 5000);

    messageTimers.set(messageId, timer);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('listening on *4000');
});