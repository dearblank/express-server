var express = require('express')
var router = express.Router()
 
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'study'
  });
   
  connection.connect();

router.get('/', function(req, res, next) {
    res.send('获取城市api示例');
  });

router.get('/getFullCityMsg', (req, res)=>{
  connection.query('select * from city', function (error, results, fields) {
    if (error) throw error;
    res.json(results)
  });
})

router.get('/getCityMsg', (req, res)=>{
  let kw = req.url.split('?')[1].split('=')[1]
  connection.query('select * from city where Name like "%' + kw + '%"', function (error, results, fields) {
    if (error) throw error;
    res.json({
      err: 0,
      msg: '成功获得城市信息',
      data: results
    })
  })
})
  module.exports = router;