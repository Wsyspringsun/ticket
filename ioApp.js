var socket_io = require('socket.io');
var app = function(server){
  var io = socket_io(server);
  io.on('connection',function(socket){
      socket.on('cltmessage',(msg)=>{
	      console.log(msg);
        socket.broadcast.emit('srvmessage',msg);
      });
  });
  io.on('disConnection',function(socket){
    socket.broadcast.emit('disConnection',{msg:socket.id+'离开'});
  });
 
}
 
 
module.exports = app;
