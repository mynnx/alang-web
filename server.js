import Server from 'socket.io';
import express from 'express';
import gingerbread from 'gingerbread';

var globalState = [];
var io = null;

export function startServer() {
  io = new Server().attach(8090);

  io.on('connection', (socket) => {
    socket.emit('state', globalState);
  });

  return io;
}

export function startAPIServer() {
  const app = express();
  app.get('/api', (req, res) => {
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

  app.listen(8070, function(err) {
    if (err) return console.log(err);
    console.log('API running on localhost:8070');
  });
}

startServer();
startAPIServer()
