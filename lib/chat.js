var http = require('http');
var socket = require('socket.io');
var fs = require('fs');

var app = http.createServer((req,res)=>{
    var html = fs.readFileSync('client.html');
    res.end(html);
    //res.sendfile('client.html');
});
var io = socket(app);
io.on('connection',function(socket){
    console.log('connect');
    socket.on('cltmessage',(msg)=>{
        // socket.broadcast 只向非本socket客户端发射message事件
        socket.broadcast.emit('srvmessage',msg);
    });
});
io.on('disConnection',function(socket){
    console.log('disConnect');
});
//function tick(){
    //io.send(new Date());
//}
//setInterval(tick,1000);
app.listen(3000);
