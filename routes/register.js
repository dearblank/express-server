var express = require('express')
var router = express.Router()
 
var mysql = require('mysql');
const { use } = require('./city');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'study'
  });
   
  connection.connect();

router.post('/', function(req, res, next) {
    let username = req.body.username
    let password = req.body.password
    connection.query(`select username from user where username='${username}'`, (error, results, fields)=>{
        if (error) throw error;
        if(results.length == 0){
            connection.query(`insert into user values ('${username}','${password}','${Date.now()}')`)
            res.json({
                err: 0,
                message: '注册成功',
                data: {
                    username,
                    success: true
                }
            })
        }else{
            res.json({
                err: 1,
                message: '该用户名刚刚被注册过啦',
                data: {
                    username,
                    success: false
                }
            })
        }
    })
  });

router.get('/usernameExist',(req, res, next)=>{
    let username = req.query.username
    if(!/^[a-zA-Z0-9_-]{3,16}$/.test(username)) {
        res.json({
            err: 2,
            message: '用户名不符合格式要求，应由3~16位数字、字母、_或-组成'
        })
    }else{
        connection.query(`select username from user where username='${username}'`, (error, results, fields)=>{
            if (error) throw error;
            if(results.length > 0){
                res.json({
                    err: 1,
                    message: '该用户名已被注册，请重新填写'
                })
            }else{
                res.json({
                    err: 0,
                    message: '该用户名暂未被占用'
                })
            }
        })
    }
})

  module.exports = router;