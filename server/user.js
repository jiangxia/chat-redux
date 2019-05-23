const express = require('express');
const utils = require('utility')
const Router = express.Router();
const model = require('./model')
const User = model.getModel('user')
const _filter = { pwd: 0, __v: 0 };
// 删除数据
// User.remove({}, function(err, doc){})

Router.get('/list', function (req, res) {
  User.find({}, function (err, doc) {
    return res.json(doc);
  })
})

Router.post('/login', function (req, res) {
  const { user, pwd } = req.body;

  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, data: doc });

  })

})

Router.post('/register', function (req, res) {
  const { user, pwd, type } = req.body;

  User.findOne({ user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名已重复' });
    }
    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save(function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错' });
      }
      const { user, _id, type } = d;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, _id, type } });
    })
  })

})

Router.get('/info', function (req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  })
})

function md5Pwd(pwd) {
  const salt = 'react_redux_router_34wrwe|dfdsfsad~da@#$%^^&$#@';
  return utils.md5(utils.md5(salt + pwd));
}

module.exports = Router;