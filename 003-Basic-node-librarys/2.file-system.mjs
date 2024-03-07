import fs from 'node:fs'
//const fs = require('node:fs');
import fsp from 'node:fs/promises'

const stats = fs.statSync('./texts/file.txt') // -> sincronico detiene el hilo :(

console.log(
  stats.isFile(), // si es fichero
  stats.isDirectory(), // si es directorio
  stats.isSymbolicLink(), // si es un enlace simbolico??
  stats.size // tamaño en bytes
)

/*-----------------------------------------------------*/
const text = fs.readFileSync('./texts/file.txt', 'utf-8')

/* con callback */
fs.readFile('./texts/fileAsync.txt', 'utf-8', (error, text) => {
  console.log(text)
})

/* con promesa */
fsp.readFile('./texts/fileAsync.txt', 'utf-8')
  .then((text) => {
    console.log(text)
  })

/* asyncrona pero si falla uno falla todo */
Promise.all([
  fsp.readFile('./texts/file.txt', 'utf-8'),
  fsp.readFile('./texts/fileAsync.txt', 'utf-8')
]).then(([file1, file2])=> {
  console.log(file1)
  console.log(file2)
})

/* asyncrona pero si falla uno se sabe cual falla */
Promise.allSettled([
  fsp.readFile('./texts/file.txt', 'utf-8'),
  fsp.readFile('./texts/fileAsync.txt', 'utf-8')
]).then(([file1, file2])=> {
  console.log(file1)
  console.log(file2)
})