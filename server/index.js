const express = require('express')
const app = express()
const port = 4000
const { User } = require('./models/User');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/key');
const { auth } = require('./middleware/auth');

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
app.use(cookieParser());

//mongoose.connect(config.mongoURI, {
mongoose.connect('mongodb://hyunseung:gustmd22^^@hyunseung-shard-00-00.uup0y.mongodb.net:27017,hyunseung-shard-00-01.uup0y.mongodb.net:27017,hyunseung-shard-00-02.uup0y.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-14ml8r-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('success')).catch(err => console.log(err))


app.get('/api/hello', (req, res) =>{
  res.send("이니는 슬퐁 흐규흐규");
})

app.get('/', (req, res) => {
  res.send('Hello World33333gggggg33!')
})

app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res) => {
  // email db find
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user){
      return res.json({loginSuccess: false, message: "해당 이메일이 존재하지 않습니다."})
    }
    console.log(1);
    // compare Password
    user.comparePassword(req.body.password, function(err, isMatched){
      if(!isMatched){
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
      }
      console.log(2);
      // login Proccess
      user.generateToken(function(err, user){
        if(err) return res.status(400).send(err)

        // save token
        res.cookie("x_Auth", user.token)
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id
        })
      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  })
})

app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
    if(err) return res.json({success: false, err})
    return res.status(200).send({
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})