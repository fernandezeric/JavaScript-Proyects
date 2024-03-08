import z from 'zod'

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Flaco pone un string',
    required_error: 'Y la movie?'
  }),
  year: z.number().int().positive(),
  director: z.string(),
  duration: z.number().min(0),
  rate: z.number().min(0).max(10),
  poster: z.string().url(),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horro', 'Thriller', 'Sci-Fi'])
  )
})

const validateMovie = (object) => {
  return movieSchema.safeParse(object)
}

const validatePartialMovie = (object) => {
  return movieSchema.partial().safeParse(object)
}

export {
  validateMovie,
  validatePartialMovie
}
