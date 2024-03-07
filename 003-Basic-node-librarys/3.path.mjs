import path from 'node:path'

console.log(path.sep, "<- asi se separa barras por linux/windows/etc")

const filePath = path.join('SendaCarpeta', 'MiniCarpeta', 'archivo.txt')
console.log(filePath)

const base = path.basename('/no/me/la/conteiner/nomelaconteiner.txt')
console.log(base)

const filename = path.basename('/no/me/la/conteiner/nomelaconteiner.txt', '.txt')
console.log(filename)

const extension = path.extname('de.locos.pdf.exe')
console.log(extension)