const express = require('express')//익스프레스 모델을 가져옴
const app = express()
const port = 5000
const bodyParser = require("body-parser");

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extented: true }));

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
// mongoose.connect(config.mongoURI, {
//   useNewUrlParser: true, useFindAndModify: true, useCreateIndex: true, useFindAndModify: false
// }).then(() => console.log('MongoDB Connected...'))
//   .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('돌겠다크')//헬로우 월드를 출력시켜줌
})
app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  //여기서 세이브하기전에 암호화해줘야함.
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    })
  })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
