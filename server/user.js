const express = require('express');
const utils = require('utility')
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user')

// 删除数据
// User.remove({}, function(err, doc){
//     console.log(doc);

// })


Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc);
  })
})

Router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body;
  console.log(user, pwd, type);

  User.findOne({ user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名已重复' });
    }
    User.create({ user, type, pwd: md5Pwd(pwd) }, function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错' });
      }
      return res.json({ code: 0 });
    })
  })

})

Router.get('/info', function (req, res) {
  return res.json({ code: 1 });
})

function md5Pwd(pwd) {
  const salt = 'react_redux_router_34wrwe|dfdsfsad~da@#$%^^&$#@';
  return utils.md5(utils.md5(salt + pwd));
}

module.exports = Router;