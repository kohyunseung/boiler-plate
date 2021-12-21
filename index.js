const express = require('express')
const app = express()
const port = 4000
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/key');

// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://hyunseung:gustmd22^^@hyunseung.uup0y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("hyunseung").collection("devices");
//   // perform actions on the collection object
//   //client.close();
//   console.log('success');
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, {
//mongoose.connect('mongodb://hyunseung:gustmd22^^@hyunseung-shard-00-00.uup0y.mongodb.net:27017,hyunseung-shard-00-01.uup0y.mongodb.net:27017,hyunseung-shard-00-02.uup0y.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14ml8r-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('success')).catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World33333gggggg33!')
})

app.post('/register', (req, res) => {
  // 회원가입 시 필요한 정보 들을 db저장
  const user = new User(req.body);

  console.log(req.body);
  // mongoose save
  user.save((err, userInfo) => {
    // error
    if(err) return res.json({success: false, err})
    // success
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})