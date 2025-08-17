// Reveal.js multiplex server
// Without static file server

var http	= require('http');
var express	= require('express');
var fs		= require('fs');
var io		= require('socket.io');
var crypto	= require('crypto');

var app		= express();
var staticDir	= express.static;
var server	= http.createServer(app);

io = io(server, {
  cors: {
    origin: /\.(seanho|anchorlytics)\.com$/,
    methods: "GET,POST"
  }
});

var opts = {
  port: process.env.PORT || 8080,
  addr: process.env.ADDR || '0.0.0.0'
};

// number of hex digits
const SECRET_LENGTH = 16;
const SOCKETID_LENGTH = 16;

io.on( 'connection', function( socket ) {
  socket.on('multiplex-statechanged', function(data) {
    if (typeof data.secret == 'undefined' || data.secret == null || data.secret === '') return;
    if (createHash(data.secret) === data.socketId) {
      data.secret = null;
      socket.broadcast.emit(data.socketId, data);
      console.log("reveal.js: master on " + data.socketId);
    } else {
      console.log("reveal.js: invalid secret " + data.secret + " for socket " + data.socketId);
    }
  });
});

app.get("/", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});

  var stream = fs.createReadStream('index.html');

  stream.on('error', function( error ) {
    res.write('<style>body{font-family: sans-serif;}</style><h2>reveal.js multiplex server.</h2><a href="/token">Generate token</a>');
    res.end();
  });

  stream.on('readable', function() {
    stream.pipe(res);
  });

});

app.get("/token", function(req,res) {
  var secret = crypto.randomBytes(SECRET_LENGTH/2).toString('hex');
  res.send({secret: secret, socketId: createHash(secret)});
});

var createHash = function(secret) {
  const hash = crypto.createHash('sha256');
  hash.update(secret, 'hex');
  return(hash.digest('hex').slice(-SOCKETID_LENGTH));
};

// Actually listen
server.listen( opts.port, opts.addr );

console.log("reveal.js: multiplex at " + opts.addr + ":" + opts.port);

