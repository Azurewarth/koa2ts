import Koa = require('koa')
import First from './middleware/first.middleware'
import Second from './middleware/second.middleware'

export default function(app:Koa) {
    app.use(First)
    app.use(Second)
}