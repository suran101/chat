# Chat

## 题目描述
写一个聊天应用，前端使用react，后端使用nodejs（不限制后端语言）。
要求：
1 使用react制作一个聊天窗口实现两个人聊天回复，样式友好不易太简陋，可以基于成熟的开源的chat组件
2 前后端使用websocket通信协议实现
3 5秒后对方未回复，可自己模拟一个机器人回复消息，也可以接入机器人OPENAPI(AI回复)更佳（openapi不做强要求）
4 要求候选人把前后端的代码发布到自己的github公共仓库中，并且在markdown文档中注明项目启动和调试方式，并且录制视频，演示项目

## 项目启动和调试方式

### 前端
1. 进入`react-demo`目录：
    ```bash
    cd react-demo
    ```
2. 安装依赖：
    ```bash
    npm install
    ```
3. 启动React应用：
    ```bash
    npm start
    ```
    模拟两个用户的切换是根据url中username字段，所以访问时要加上(http://localhost:3000/?username="用户1/2")


### 后端
1. 进入`chat-express`目录：
    ```bash
    cd chat-express
    ```
2. 安装依赖：
    ```bash
    npm install
    ```
3. 启动Node.js服务器：
    ```bash
    node index.js
    ```

## 视频演示
请参阅视频演示链接：[演示视频](https://www.bilibili.com/video/BV1AJ4m1G72Y/?spm_id_from=333.999.0.0)