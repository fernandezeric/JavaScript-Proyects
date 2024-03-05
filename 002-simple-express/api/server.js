import express from 'express'

export const app = express()
app.use(express.json()) // --> req.body

// Fake db
const items = [
  { id: 1, content: 'Item 1', stars: 0 },
  // { id: 2, content: 'Item 2', stars: 3 },
  // { id: 3, content: 'Item 3', stars: 3 },
  // { id: 4, content: 'Item 4', stars: 5 }
]

// GET all items
app.get('/items', (req, res) => {
  return res.json(items)
})

// GET one item
app.get('/items/:id', (req, res) => {
  const { id } = req.params

  const item = items.find(item => item.id === Number(id))

  return res.json(item)
})

// GET item with x stars
app.get('/items/stars/:stars', (req, res) => {
  const { stars } = req.params

  const itemStars = items.filter(item => item.stars === Number(stars))

  return res.json(itemStars)
})


// POST one
app.post('/items', (req, res) => {
  const { content, stars } = req.body

  const newId = items.length + 1
  const newItem = {
    id: newId,
    content,
    stars
  }

  items.push(newItem)

  return res.json(newItem)
})

// PUT one
app.put('/items/:id', (req, res) => {
  const { id } = req.params
  const { content, stars } = req.body

  const item = items.find(item => item.id === Number(id))
  item.content = content
  item.stars = stars

  return res.json(item)
})

// DELETE one
app.delete('/items/:id', (req, res) => {
  const { id } = req.params

  const itemIndex = items.findIndex(item => item.id === Number(id))

  items.splice(itemIndex, 1)

  res.status(200).json()
})

export const server = app.listen(process.env.PORT_SERVER ?? 3000, () => {
    console.log(`listening on port ${process.env.PORT_SERVER ?? 3000}`)
  })
// app.listen(process.env.PORT_SERVER ?? 3000, () => {
//   console.log(`listening on port ${process.env.PORT_SERVER ?? 3000}`)
// })