const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes/router.js')
const session = require('express-session')
const config = require('./config.js')
const app = express();

// 对post请求的请求体进行解析
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 为req 成员添加session 对象
app.use(session({
    secret: 'wht',
    resave: false,
    saveUninitialized: false,
}))

app.get('/', (req, res, next) => {
    res.status(200).send('api is running')
})

app.use(router)

// 统一处理 500 错误
app.use((err, req, res, next) => {
    res.status(500).json({ err: err.message })
})


app.listen(config.port, () => {
    console.log('app is running at port 3000')
})