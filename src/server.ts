import WebSocket, {WebSocketServer} from 'ws'

const wss = new WebSocketServer({port: 8080})

wss.on('connection', function connection(ws) {
  ws.on('error', console.error)

  ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        console.log(data.toString());
        
        client.send(data.toString(), {binary: isBinary})
      }
    })
  })
})
// import {WebSocketServer} from 'ws'

// const wss = new WebSocketServer({port: 3000})

// wss.on('connection', (ws) => {
//   ws.on('message', (data) => {
//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         console.log(JSON.parse(data.toString()))
//         client.send(JSON.parse(data.toString()))
//       }
//     })
//   })
// })

wss.on('listening', () => {
  console.log(`⚡️ running on port 3000`)
})
