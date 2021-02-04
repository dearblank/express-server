//mongodb连接
var mongoose = require('mongoose')
var conn = mongoose.connect('mongodb://localhost/test01', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
const db = mongoose.connection
db.on('error', ()=>{
    console.log('mongodb连接失败')
})
db.once('open', ()=>{
    console.log('mongodb连接成功')
})