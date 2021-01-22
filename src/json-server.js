// @ts-check
const fs = require('fs');
const path = require('path');
const jsonServer = require('json-server');
const logger = require('morgan');

const server = jsonServer.create();
const middlewares = jsonServer.defaults({ logger: false, readOnly: true });

const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' });
middlewares.push(
    logger('dev', {
        skip: (req) => process.env.NODE_ENV === 'test' || req.path === '/favicon.ico',
        stream: accessLogStream
    })
);
 
server.use(middlewares)
server.use((req, res, next) => {
    console.log('requiest handler');
    res.header('X-Hello', 'World').json({ok: 1});
    next();
});

server.listen(3000, () => console.log('JSON Server is running'));
