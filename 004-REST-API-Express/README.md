# Rest API

Una api rest en **express()** que utiliza **zod** para las validaciones.


Esta seprado en MVC, falta agregar una base de datos.
Falta agregar un manejo de errores decente. (try-catch, su middleware)

**Instalar la API**
```js
npm install
npm run dev //node --watch app.js
```

Con la extensión REST Client de VSC se puede probar rápidamente
los el archivo **./api.http**

### Tips Import Json

```js
// La nueva (una experimental que no fue es *assert*)
import myJson from './data/myJson.json' with { type: 'json' }

//La casi
// -> utils.js
import { createRequire } from 'node:module'
const requite = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

// -> Donde se use
import { readJSON } from './utils'
const myJson = readJSON(./data/myJson.json)

//La no tan decente
import fs from 'node:fs'
const myJson = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))
```