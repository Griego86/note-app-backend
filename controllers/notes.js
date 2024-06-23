import express from "express"
const notesRouter = express.Router()
import Note from '../models/note.js'
import User from '../models/user.js'

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id)
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
})

notesRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  })
  
  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  
  res.status(201).json(savedNote)
})

notesRouter.delete('/:id' , async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

notesRouter.put('/:id', (req, res, next) => {
  const { content, important } = req.body

  Note.findByIdAndUpdate(
    req.params.id, 
    { content, important },
    { new:true, runValidators: true, context: 'query' })
    .then(updatedNote => {
      res.json(updatedNote)
    })
    .catch(error => next(error))
})

export default notesRouter