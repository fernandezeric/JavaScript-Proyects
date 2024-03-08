import express from 'express'
import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = process.env.PORT ?? 3000

const app = express()

// quita el 'x-powered-by' de los headers
app.disable('x-powered-by')
app.use(express.json())
app.use(corsMiddleware())

app.get('/', (req, res) => {
  res.json({ message: 'Akira Toriyama </3' })
})

app.use('/movies', moviesRouter)

app.listen(PORT, () => {
  console.log(`Server run in http://localhost:${PORT}`)
})
