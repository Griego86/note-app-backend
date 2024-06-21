import mongoose from "mongoose"

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.sg4cdiq.mongodb.net/testApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'React is not that hard',
  important: false
})

note.save().then(res => {
  console.log('note saved')
  mongoose.connection.close()
})

// Note.find({}).then(res => {
//   res.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })