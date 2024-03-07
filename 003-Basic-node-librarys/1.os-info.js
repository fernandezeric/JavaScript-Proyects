const os = require('node:os')
// import os OR { platform, cpus, ...} from 'node:os'

console.log("------------------------------------")
console.log('Nombre sistema operativo', os.platform())
console.log('Procesadores', os.cpus())
console.log('Version del sistema', os.release())
console.log('Arquitecura', os.arch())
console.log('Memoria libre', os.freemem() / 1024 / 1024)
console.log('Memoria total', os.totalmem() / 1024 / 1024)
console.log('uptime', os.uptime() / 60 / 60)
console.log("------------------------------------")
