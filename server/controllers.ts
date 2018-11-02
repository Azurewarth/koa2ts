import Koa      = require('koa')
import testController from './controllers/test.controller'

export default function(app:Koa) {
    app.use((<any>testController).routes()).use((<any>testController).allowedMethods())
}