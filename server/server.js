require('dotenv').config();               // dotenv 라이브러리를 이용 환경변수 로드(npm install dotenv) : process.env.SERVER_PORT 가 존재하지 않으면 undefined  
const express = require('express');       // express 웹 애플리케이션 프레임워크 모듈 attache
const http = require('http');             // http 모듈 attatch (node.js 이 기본 모듈)
const path = require('path');             // path 모듈 attatch (node.js 이 기본 모듈)
const db = require('./plugins/mysql');

//앱 초기화
const app = express();                              // express 모듈을 app 에 할당
const host = process.env.SERVER_HOST || 'http://localhost';   // 환경변수속 SERVER_HOST 를 port 에 할당
const port = process.env.SERVER_PORT || 3000;                 // 환경변수속 SERVER_PORT 를 port 에 할당
const webServer = http.createServer(app);                     // Http module 속 createServer 로 app에 attach 된 express 함수로 된 webServer 생성

// 정적 폴더 위치 지정 : build 를 한번 해 주면 dist 폴더가 생성되는데,
// 이 dist 폴더를 정적파일 경로로 설정하여 Vue.js 또는 React 앱을 배포할 수 있도록 함함
// app.use(express.static(path.join(__dirname, "../dist")));   // app 속 use 를 사용 - 정적 파일들(HTML,CSS, JavaScript 등)의 path 지정 (/dist 폴더)

// 정적 폴더 위치 지정 및 확인하는 코드
// 정적(static) 파일을 제공하기 위해 특정 디렉터리(../dist)의 존재 여부를 확인한 후, 해당 디렉터리가 존재하면 Express 애플리케이션에 정적 파일 서비스 미들웨어를 추가하는 역할
const fs = require('fs');                               // file system module attatch
const staticPath = path.join(__dirname, "../dist");     // path module 의 join 함수로 (현재 실행 스크립트 기준으로 상위 아래 dist 폴더) path 지정정

if (fs.existsSync(staticPath)) {                                  // file system module의 existsSync 함수로 staticPath 의 파일이나 폴더의 존재여부 확인값 발생
  app.use(express.static(staticPath));                            // express module의 static 함수로 (지정 경로) 를 express 정적 폴더를 사용
} else {
  console.error("Error: Static files directory not found!");      // staticPath 값이 없으면, console 모듈의 err 함수로 (출력)
}


// 서버 응답
webServer.listen(port, () => {        // 생성된 WebServer 의 listen 함수로 (port 에서, 반환값을 보낸다) 
  console.log(`${host}:${port}`);     // console module 속 log 함수로 (내보낸다)
});
