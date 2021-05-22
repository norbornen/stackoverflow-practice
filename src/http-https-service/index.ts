import fs from "fs";
import http from "http";
import https from "https";

const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(`incoming, ${req.url}`, req.headers);
  res.writeHead(200);
  res.end('Hello World!\n');
};

const server1 = http.createServer(requestListener);
const server2 = https.createServer(
  {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
  },
  requestListener
);

server1.listen(3080, 'localhost', () => console.log('HTTP server localhost:3080 was runing...'));
server2.listen(3443, 'localhost', () => console.log('HTTPS server localhost:3443 was runing...'));
