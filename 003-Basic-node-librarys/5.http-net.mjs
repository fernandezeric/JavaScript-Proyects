import http from 'node:http' // protocolo http
import net from 'node:net' // protocolo tcp más rápido

// const port = 0 // para que use un puerto disponible

// const server = http.createServer((req, res) => {
//   console.log('Request received')
//   res.end('Hola mundirijillo')
// })

// server.listen(port, () => {
//   console.log(`Server listening on port http://localhost:${server.address().port}`)
// })

function findAvailablePort(desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

findAvailablePort(3000).then(port => {
  console.log(port)
})
//module.exports = { findAvailablePort }