import KoaRouter = require('koa-router')
let router = new KoaRouter()

interface KoaMethodParams {
	url:string,
	method:string,
	routerMiddlewares?:Array<any>
}

function Controller(prefix?:string, middleware?:Array<Function>): Function {
    if (prefix) router.prefix(prefix)
    return function (target:any): KoaRouter {
        let reqList = (<any>Object).getOwnPropertyDescriptors(target.prototype)
        for (let v in reqList) {
            if (v !== 'constructor') {
                let fn = reqList[v].value
                fn(router, middleware)
            }
        }
        return router
    }
}

function KoaRequest({ url, method, routerMiddlewares = []}:KoaMethodParams):Function {
	return function (target, name, descriptor) {
		let fn = descriptor.value
		descriptor.value = function(router:KoaRouter, controllerMiddlewares:Array<any> = []) {
			for(let i = 0; i < controllerMiddlewares.length; i++) 
				router.use(url, controllerMiddlewares[i])

			for(let j = 0; j < routerMiddlewares.length; j++) 
				router.use(url, routerMiddlewares[j])
		
			router[method](url, async (ctx, next) => {
				fn(ctx, next)
			})
		}
	}
}

function Get(url:string, middleware?:Array<Function>) {
	return KoaRequest({ url, method: 'get', routerMiddlewares: middleware })
}

function Post(url:string, middleware?:Array<Function>) {
	return KoaRequest({ url, method: 'post', routerMiddlewares: middleware })
}

function Put(url:string, middleware?:Array<Function>) {
	return KoaRequest({ url, method: 'put', routerMiddlewares: middleware })
}

function Delete(url:string, middleware?:Array<Function>) {
	return KoaRequest({ url, method: 'delete', routerMiddlewares: middleware })
}

function All(url:string, middleware?:Array<Function>) {
	return KoaRequest({ url, method: 'all', routerMiddlewares: middleware })
}

export { Controller, Get, Post, Put, Delete, All }