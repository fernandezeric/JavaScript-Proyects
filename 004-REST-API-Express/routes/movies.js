import { Router } from 'express'
import MovieController from '../controllers/movie.js'

const moviesRouter = Router()

moviesRouter.get('/', MovieController.getAll)
moviesRouter.get('/:id', MovieController.getById)
moviesRouter.post('/', MovieController.createOne)
moviesRouter.patch('/:id', MovieController.pathOne)
moviesRouter.delete('/:id', MovieController.deleteOne)

export {
  moviesRouter
}
