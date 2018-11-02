
export default function (ctx:any, next:Function) {
    console.log('second start...')
    next()
    console.log('second end...')
}
