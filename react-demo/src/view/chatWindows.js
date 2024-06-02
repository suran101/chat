import React, { useState, useEffect } from 'react';
import { MessageList, Input, Button } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

import socketIOClient from "socket.io-client";
let newSocket;

let Chat = () => {
    const [messageList, setMessageList] = useState([]); // 消息列表

    const [messageText, setMessageText] = useState('');// 文本输入text
    const username = new URLSearchParams(window.location.search).get('username') || 'User1'; // 判断用户

    // 是否连接成功
    const [isConnected, setIsConnected] = useState(false);

    useEffect(()=>{
        newSocket = socketIOClient('http://localhost:4000'); // socoet.iO 连接服务端
        connectSocket();
        return () => newSocket.close();
    }, [username])

    // 连接 socket
    const connectSocket = () => {
      console.log('执行 connectSocket')
     
      newSocket.on('connect',  ()=>{
        setIsConnected(true);
        console.log('client connect server');
      });

      // 接收服务器发送的消息
      newSocket.on('message', (data) => {
        const message = JSON.parse(data);
        setMessageList(prevMessages => [...prevMessages, {
          position: message.username === username ? 'right' : 'left', // 判断用户名的位置
          type: 'text',
          text: message.text,
          date: new Date()
        }]);
      });
    }

    // 发送消息
    const sendMessage = () => {
      const userMessage = { username, text: messageText };
      newSocket.emit('message', JSON.stringify(userMessage)); // 将消息发送到服务器
      setMessageText('');// 清除输入框
    };

    return (
        <div style={{ width: '400px', margin: '0 auto', paddingTop: '50px' }}>
            <MessageList
              className='message-list'
              lockable={true}
              toBottomHeight={'100%'}
              dataSource={messageList}
            />
            <Input
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              rightButtons={
                <Button text={'Send'} onClick={sendMessage} />
              }
            />

        </div>
    )
}

export default Chat;