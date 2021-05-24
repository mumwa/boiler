const express = require('express')//익스프레스 모델을 가져옴
const app = express()//
const port = 5000//

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://john:abcd1234@cluster0.otubm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useFindAndModify:true, useCreateIndex: true, useFindAndModify: false
}).then(()=>console.log('MongoDB Connected...'))
  .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! 하핫')//헬로우 월드를 출력시켜줌
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
