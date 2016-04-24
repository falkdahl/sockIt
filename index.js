'use strict'

var express = require('express')
var WebSocketServer = require('ws').Server

var app = express()
var wss = new WebSocketServer({port:8002})
var connections = []


// Serve the page
app.use(express.static('public'))

// Listen to the request
app.listen(8000, function(){
  console.log('Listening on port 8001, troll')
})

// Listen to the socket!
wss.on('connection', function(ws){

  console.log('Connection established')
  connections.push(ws)
  console.log('Connections: ', connections.length)

  ws.on('message', function(message){
    connections.forEach(function(conn){
      if (conn != ws)
        conn.send(message)
    })
  })

  ws.on('close', function(){
    console.log('Connection closed')
    var idxConn = connections.indexOf(ws)
    connections.splice(idxConn, 1)
    console.log('Connections: ', connections.length)
  })

})
