var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'study'
  });
   
connection.connect();

router.post('/getMenuMsg', function(req, res, next) {
  connection.query(`select * from treeMenu`, (error, results)=>{
      if(error) throw error
      res.json({
          err: 0,
          message: '成功获得树形菜单属性',
          data: results
      })
  })
});

router.post('/addMenu', (req, res)=>{
    connection.query(`select label from treeMenu where (label='${req.body.label}' and sid=${req.body.sid}) or (label='${req.body.label}' and id=${req.body.sid})`, (error, results)=>{
        if(error) throw error
        if(results.length > 0) {
            res.json({
                err: 1,
                message: '此节点下已存在该菜单'
            })
        } else {
            // connection.query(`select id from treeMenu where label='${req.body.fLabel}'`, (error, results)=>{
            //     if(error) throw error
            //     let sid = results[0].id
                connection.query(`insert into treeMenu (label, sid) values('${req.body.label}', ${req.body.sid})`, (error, results)=>{
                    if(error) throw error
                    res.json({
                        err: 0,
                        message: '增加子菜单成功'
                    })
                })
            // })
        }
    })
})

router.post('/delMenu', (req, res)=>{
    connection.query(`delete from treeMenu where id = ${req.body.id} or sid = ${req.body.id}`, (error, results)=>{
        if(error) throw error
        res.json({
            err: 0,
            message: '删除子菜单成功'
        })
    })
})

module.exports = router;
