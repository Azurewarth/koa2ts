/**
 * proxy controller
 */
import { Controller, Get } from '../decorator'

function controllerMiddleOne(ctx,next) {
    console.log('set by controllerMiddleOne start...')
    ctx.request.query.two = "set by controllerMiddleOne"
    next()
    console.log('set by controllerMiddleOne end...')
}

function controllerMiddleTwo(ctx,next) {
    console.log('set by controllerMiddleTwo start...')
    ctx.request.query.twotwo = "set by controllerMiddleTwo"
    next()
    console.log('set by controllerMiddleTwo end...')
}

function routerMiddleOne(ctx,next) {
    console.log('set by routerMiddleOne start...')
    ctx.request.query.three = "set by routerMiddleOne"
    next()
    console.log('set by routerMiddleOne end...')
}

function routerMiddleTwo(ctx,next) {
    console.log('set by routerMiddleTwo start...')
    ctx.request.query.four = "set by routerMiddleTwo"
    next()
    console.log('set by routerMiddleTwo end...')
}

@Controller("/test", [controllerMiddleOne, controllerMiddleTwo])
export default class TestController {
    @Get('/getone', [routerMiddleOne])
    async testOne(ctx) {
        console.log('testOne start...')
        ctx.body = 'get one : ' + ctx.request.query.one
        console.log('testOne end...')
    }

    @Get('/gettwo', [routerMiddleTwo])
    async testTwo(ctx) {
        console.log('testTwo start...')
        ctx.body = 'get two : ' + ctx.request.query.one
        console.log('testTwo end...')
    }

    @Get('/retry')
    async retry(ctx) {
        console.log('retry start...')
        ctx.status = 404
        console.log('retry end...')   
    }
}