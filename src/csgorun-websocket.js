// @ts-check
const WebSocketClient = require('websocket').client;
const client = new WebSocketClient();
const fs = require('fs');


client.on('connect', handler);

client.connect('wss://ws.csgorun.pro/connection/websocket');
function handler(connection) {
    connection.on('message', function (message) {
        // console.log(message);
        parseData(message)
    })
    connection.sendUTF('{"params":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTkxODc1IiwiaWF0IjoxNjA0NDI4NzA2fQ.UnRI422cVi2eLezoCnMvJJUeylhJMklvxMC16hqVaj8"},"id":1}\t');
    setTimeout(function (){
        connection.sendUTF('{"method":1,"params":{"channel":"u-noty#1191875"},"id":2} {"method":1,"params":{"channel":"online"},"id":3} {"method":1,"params":{"channel":"game"},"id":4} {"method":1,"params":{"channel":"bets"},"id":5} {"method":1,"params":{"channel":"u-ub#1191875"},"id":6} {"method":1,"params":{"channel":"user-bet#1191875"},"id":7} {"method":1,"params":{"channel":"lottery"},"id":8} {"method":1,"params":{"channel":"u-#1191875"},"id":9} {"method":1,"params":{"channel":"u-i#1191875"},"id":10} {"method":1,"params":{"channel":"c-ru"},"id":11} {"method":1,"params":{"channel":"medkit"},"id":12}\t')
        console.log("sended")
    }, 5000)
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

let summm = 0

function parseData(msg) {
    // console.log(msg.utf8Data)
    if (IsJsonString(msg.utf8Data)) {
        const data = JSON.parse(msg.utf8Data)
        if (data.result) {
            if (data.result.channel === "game") {
                // console.log(data.result.data.data.type)
                if (data.result.data.data.type === "c") {
                    // console.log(data.result.data.data.c, data.result.data.data.i, summm) // инфа по краш коеф
                    summm = 0
                }
            }else if (data.result.channel === "bets") {
                if (data.result.data.data.type === "nb") {
                    console.log(data.result.data.data.b.d.a, data.result.data.data.b.i) // инфа по ставкам
                    summm += data.result.data.data.b.d.a
                }
            }
        }
    }
}
