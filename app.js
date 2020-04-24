require('dotenv').config();

const express = require ('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const winston = require('winston');

const https = require('https');

app.use(express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.get('/', function(req, res) {
    res.sendFile('/index.html');
});

// SOCKET.IO *********************************
io.on('connection', function(socket) {
    // console.log('a user connected');
    io.emit('connData', { nodes, links });
    socket.on('disconnect', function(){
        // console.log('user disconnected');
    });
});

http.listen(process.env.NODE_PORT, function() {
    console.log('listening on *:3000');
});

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: '/storage/logs/error.log', level: 'error' }),
        new winston.transports.File({ filename: '/storage/logs/combined.log' })
    ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}