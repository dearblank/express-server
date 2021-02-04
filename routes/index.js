var express = require('express');
var router = express.Router();
var userModel = require('../model/userModel')

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'study'
});

connection.connect();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/login', (req, res, next) => {
  let password = req.body.password
  connection.query(`select * from user where username='${req.body.username}'`, (error, results) => {
    // console.log(results)
    if (error) throw error
    if (results.length > 0) {
      let checkPass = results[0].password
      if (password === checkPass) {
        res.json({
          err: 0,
          message: '登录成功',
          data: {
            success: true
          }
        })
      } else {
        res.json({
          err: 2,
          message: '密码错误',
          data: {
            success: false
          }
        })
      }
    } else {
      res.json({
        err: 1,
        message: '用户名不存在',
        data: {
          success: false
        }
      })
    }
  })
})

//mongodb用户注册
router.post('/userReg', (req, res) => {
  userModel.find({
    username: req.body.username
  }).then(arr=>{
    if(arr.length > 0){
      res.json({
        err: 1,
        message: '该用户名刚刚被注册过啦',
        data: {
          username: req.body.username,
          success: false
        }
      })
    }else{
      userModel.insertMany([{
        username: req.body.username,
        password: req.body.password,
        reg_time: Date.now()
      }]).then(arr => {
        // console.log('arr', arr)
        res.json({
          err: 0,
          msg: '注册成功',
          data: {
            success: true
          }
        })
      })
    }
  })
})

//mongodb注册验证
router.get('/userReg/usernameExist', (req, res) => {
  let username = req.query.username
  if (!/^[a-zA-Z0-9_-]{3,16}$/.test(username)) {
    res.json({
      err: 2,
      message: '用户名不符合格式要求，应由3~16位数字、字母、_或-组成'
    })
  } else {
    userModel.find({
      username
    }).then(arr => {
      // console.log(arr)
      if (arr.length > 0) {
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

//mongodb登录
router.post('/userLog', (req, res) => {
  let password = req.body.password
  userModel.find({
    username: req.body.username
  }).then(arr => {
    // console.log(arr[0].password)
    if (arr.length > 0) {
      if (password === arr[0].password) {
        res.json({
          err: 0,
          message: '登录成功',
          data: {
            success: true
          }
        })
      } else {
        res.json({
          err: 2,
          message: '密码错误',
          data: {
            success: false
          }
        })
      }
    } else {
      res.json({
        err: 1,
        message: '用户名不存在',
        data: {
          success: false
        }
      })
    }
  })
})

module.exports = router;