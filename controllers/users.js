import bcrypt from 'bcrypt'
import express from 'express'
const usersRouter = express.Router()
import User from '../models/user.js'

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

export default usersRouter