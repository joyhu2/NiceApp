// 主线程app
const express = require('express')
const app = express()
// 验证规则
const Joi = require('@hapi/joi')
const cors = require('cors')
// 配置文件
const config = require('./config')
// token解析中间件
const expressJwt = require('express-jwt')

// 中间件流程：跨域-解析www-res.cc定义-验证token（api跳过）-路由操作-错误级

// 跨域
app.use(cors())
// 解析
app.use(express.urlencoded({ extended: false }))

// res.cc
app.use(function(req, res, next){
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

// 验证token
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({path: [/^\/user/]}))


// 路由/api
// 注册登录
const userRouter = require('./router/user')
app.use('/user', userRouter)

// /my
// 获取用户信息
const userinfoRouter = require('./router/userinfo')
app.use('/userinfo', userinfoRouter)

// // /upload
// const upload = require('./router/pic')
// app.use('/upload', upload) 

// /share
// 上传内容
const share = require('./router/share')
app.use('/share', share)


// 定义错误级别的中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof Joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc(err)
    // 其他错误
    res.cc(err)
})


app.listen(8888, () => {
    console.log('express server is running at http://127.0.0.1:8888')
})
