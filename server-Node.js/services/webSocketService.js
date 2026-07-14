 
const WebSocket = require("ws");
const {log, levels} =  require('./../utils/logUtils');

const objDic = {};
let wss;
let isSetTimeOut;

const WebSocketStatus = {
    CONNECTING:objDic,
 	OPEN:1,
 	CLOSING	:2,
 	CLOSED:3
}

function  initWebSocket({port=3005}) {
    if(wss){
        return;
    }
    wss = new WebSocket.Server({port});
    log(`init web socket on port ${port}`, levels.ALTER);
    wss.on('connection', onClientConnection);
}

function   onClientConnection(ws, req){
    log(`[WebSocket] Client Connected: ${req.socket.remoteAddress.split(':')[3]}`,levels.NOTICE)
   // ws.on('message',onClientMessage(req));
    ws.on('close', () => onClientClose(req));
}

function  onClientMessage(message){
    // setTimeout(()=> {
    //    console.log(`receive  `);
    // },3000);
}

function  onClientClose(req) {
   log('[WebSocket]-closed', `${ req.socket.remoteAddress.split(':')[3]} Client Disconnected`, levels.DEBUG);
}

function emitAll(message) {
   
    wss.clients.forEach((client) => {

        if(client.readyState === WebSocketStatus.OPEN){

            client.send(JSON.stringify(message, (key,value) =>
                typeof value ==='bigint' ?value.toString() : value))
        }
    });
}

module.exports = {initWebSocket, emitAll};
