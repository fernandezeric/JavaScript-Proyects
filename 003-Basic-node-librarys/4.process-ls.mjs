/* process importante para variables de entorno */
import fs from 'node:fs/promises'
import process from 'node:process'
import path from 'node:path'

// console.log(process.argv)
const folder = process.argv[2] ?? '.'

/* humilde ls */
async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(`No se ha podido mostrar el directorio ${folder}`)
    process.exit(1) // salir controlado
  }

  /* un arreglo de promesas */
  const filesPromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let fileStats
    try {
      fileStats = await fs.stat(filePath)
    }  catch {
      console.log(`No se pudieron recuperar stat de ${filePath}`)
      process.exit(1)
    }

    const isDirectory = fileStats.isDirectory()
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = fileStats.size.toString()
    const fileModifed = fileStats.mtime.toLocaleString()

    return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(20)} ${fileModifed}`
  })

  /* esperar al arreglo de promesas */
  const fileInfo = await Promise.all(filesPromises)

  fileInfo.forEach(file => console.log(file))
}

ls(folder)