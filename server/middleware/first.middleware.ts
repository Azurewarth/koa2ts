
export default function (ctx:any, next:Function) {
    console.log('first start...')
    // ctx.request.body = { data: 'tencent' }
    next()
    console.log('first end...')
}
