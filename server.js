import Server from 'socket.io';
import express from 'express';
import gingerbread from 'gingerbread';

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/dist'));
server.listen(app.get('port'));

var globalState = [];

io.on('connection', (socket) => {
  socket.emit('state', globalState);
});

app.get('/api', (req, res) => {
  console.log('got a request!', req.query.sentence);
  gingerbread(req.query.sentence, function (error, text, result, corrections) {
    let correction = {
      error: error,
      text: text,
      result: result,
      corrections: corrections
    };

    globalState.push(correction);
    io.emit('state', globalState);
    res.json(correction);
  })
});
