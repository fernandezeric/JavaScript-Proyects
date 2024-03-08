import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import MovieModel from '../models/movie.js'

/*
  quizas es mejor con clases para fijar un contrato
  y al pasarlo a TS funcionaria mejor
*/

const getAll = async (req, res) => {
  const { genre, year } = req.query
  const movies = await MovieModel.getAll({ genre, year })

  res.json(movies)
}

const getById = async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.getById({ id })

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
}

const createOne = async (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = await MovieModel.createOne(result.data)

  res.status(201).json(newMovie)
}

const pathOne = async (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const movieIndex = await MovieModel.getIndexById({ id })

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Panita la movie no está' })
  }

  const updateMovie = await MovieModel.patchOne({ movieIndex })

  res.status(200).json(updateMovie)
}

const deleteOne = async (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  if (result.error) {
    return res.status(422).json({ error: JSON.parse(result.error.message) })
  }

  const movieIndex = await MovieModel.getIndexById({ id })

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Panita la movie no está' })
  }

  await MovieModel.deleteOne({ movieIndex })

  res.json({ message: 'Movie deleted' })
}

export default {
  getAll,
  getById,
  createOne,
  pathOne,
  deleteOne
}
