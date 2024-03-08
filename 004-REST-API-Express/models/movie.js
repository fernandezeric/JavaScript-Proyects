import movies from '../data/movies.json' with { type: 'json'}
import crypto from 'node:crypto'

const getAll = async ({ genre, year }) => {
  let filteredMovies = []

  if (genre && !year) {
    filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    )
    return filteredMovies
  } else if (genre && year) {
    filteredMovies = movies.filter(
      movie => (
        movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()) &&
        movie.year == year
      )
    )
    return filteredMovies
  } else {
    return movies
  }
}

const getById = async ({ id }) => {
  return movies.filter(movie => movie.id === id)
}

const getIndexById = async ({ id }) => {
  return movies.findIndex(movie => movie.id === id)
}

const createOne = async (movieObjet) => {
  const newMovie = {
    id: crypto.randomUUID(),// id unica que viene con node
    ...movieObjet
  }

  movies.push(newMovie)

  return newMovie
}

/*
 movieIndex porque aún no esta una base de datos
 quizás llamar patchById cuando este una DB
*/
const patchOne = async ({ movieIndex }) => {
  const movie = movies[movieIndex]

  const updateMovie = {
    ...movie[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return updateMovie
}

const deleteOne = async ({ movieIndex }) => {
  movies.splice(movieIndex, 1)
}

export default {
  getAll,
  getById,
  createOne,
  patchOne,
  deleteOne,
  getIndexById
}