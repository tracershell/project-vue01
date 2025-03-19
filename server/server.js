require('dotenv').config();               // dotenv 라이브러리를 이용 환경변수 로드 : process.env.SERVER_PORT 가 존재하지 않으면 undefined
const express = require('express');       // express 웹 애플리케이션 프레임워크 모듈 attache
const http = require('http');             // http 모듈 attatch
const path = require('path');             // path 모듈 attatch

//앱 초기화
const app = express();                              // express 모듈을 app 에 할당
const port = process.env.SERVER_PORT || 3316;       // 환경변수속 SERVER_PORT 를 port 에 할당
const webServer = http.createServer(app);           // Http Web Server 생성: WebServer 에 할당- http 모듈속 createServer 에 app 할당을 이용

// 정적 폴더 위치 지정 : dist 폴더를 정적파일 경로로 설정하여 Vue.js 또는 React 앱을 배포할 수 있도록 함함
// app.use(express.static(path.join(__dirname, "../dist")));   // app 속 use 를 사용 - 정적 파일들(HTML,CSS, JavaScript 등)의 path 지정 (/dist 폴더)

// 정적 폴더 위치 지정 및 확인하는 코드
const fs = require('fs');
const staticPath = path.join(__dirname, "../dist");

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
} else {
  console.error("Error: Static files directory not found!");
}


// 서버 응답
webServer.listen(port, () => {
  console.log(`http://64.136.128.178:${port}`);
});
