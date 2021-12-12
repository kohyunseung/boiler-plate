const express = require('express')
const app = express()
const port = 4000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://hyunseung:gustmd22^^@hyunseung.uup0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('success')).catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World3333333!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})