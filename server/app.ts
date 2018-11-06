/**
 * yichongwen.
 */
"use strict"
process.env.NODE_ENV = process.env.NODE_ENV || process.env.DOCKER_ENV || 'dev'
const env  = process.env.NODE_ENV || 'dev'
const port = process.env.PORT || 3030
const host = process.env.HOST || '0.0.0.0'

import path         = require('path')
import Koa          = require('koa')
import serve        = require('koa-static')
import bodyparser   = require('koa-bodyparser')
import convert      = require('koa-convert')
import views        = require('koa-views')

import controllerServer from './controllers'
import middlewareServer from './middlewares'

const app: Koa      = new Koa()

// 参数传递解析
app.use(convert(bodyparser()))

// 静态文件的监听
app.use(serve(path.join(__dirname, '..', '/views')))

// 配置模板引擎
app.use(views(path.join(__dirname, '/template'), {
    extension: 'html'
}))

// 处理404
app.use(async (ctx, next) => {
    next()
    if(ctx.status === 404) 
        await ctx.render('fail')
})

// 处理500
app.use(async (ctx, next) => {
    try {
        next()
    } catch(err) {
        ctx.throw(500);
    }
})

// 全局中间件
middlewareServer(app)

// router载入
controllerServer(app)

// koa start
app.listen(port, () => { console.log('Server started on port ' + port, ', NODE_ENV is:', env) })