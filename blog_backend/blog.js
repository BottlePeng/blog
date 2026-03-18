const express = require('express')
const app = express()
const config = require('./config/default')
const db = require('./model/db')
const jwt = require('./lib/jwt')

// 加入静态文件
app.use(express.static(__dirname + '/data'))

// 设置跨域 - 使用中间件方式
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', '3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method == 'OPTIONS') {
    // 让options请求快速返回
    res.sendStatus(200);
  } else {
    next();
  }
});

// 解析前端的数据
app.use(express.json()) // 解析位 request.body

// token 处理
app.use(async (req, res, next) => {
  // 放行不需要验证的路径
  const publicPaths = ['/isRegister', '/signup', '/signin'];
  if (publicPaths.includes(req.path)) {
    return next();
  }

  try {
    // 检查请求体和token
    if (!req.body) {
      return res.status(400).json({ error: '请求体不能为空' });
    }

    if (typeof req.body.token === 'undefined') {
      return res.status(401).json({ error: '缺少token参数' });
    }

    let token = req.body.token;
    let isok = jwt.verifyToken(token);
    
    if (isok) {
      next();
    } else {
      // 验证未通过
      res.status(403).json({ error: 'token验证失败' });
    }
  } catch (error) {
    console.error('Token处理错误:', error);
    res.status(500).json({ error: '服务器错误' });
  }
})

// 引入路由
require('./routes')(app) 

// 启动
app.listen(config.port, () => {
  db.create();
  console.log('数据库连接/创建成功');

  console.log(`已启动端口 ${config.port}`)
})