const express = require('express')//익스프레스 모델을 가져옴
const app = express()
const port = 5000
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require('./config/key');

const { User } = require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extented: true }));

//application/json
app.use(bodyParser.json());
app.use(cookieParser());

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
app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 찾는다. 
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
      user.generateToken((err, user)=>{
        if(err) return res.status(400).send(err);
        
        //토큰을 저장한다. 어디에 ? 쿠키, 로컬스토리지 여기서는 쿠키에서 할거여
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess:true, userId:user._id})
      })
    })
  })



  //비밀번호까지 맞다면 토큰을 생성하기


})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
