const db_model = require('../model/db_model');
const jwt = require('../lib/jwt');

// 是否注册
exports.isRegister = async (req, res) => {
    // 查询数据库是否有注册用户
    await db_model.isRegister().then((result) => {
        let _isRegister = result[0].count > 0;
        res.send({
            code: _isRegister ? 200 : 400,
            data: {
                isRegister: _isRegister
            },
        })
    });
}

// 注册
exports.insertUser = async (req, res) => {
    const data = req.body;
    // 插入用户数据
    await db_model.insertUser(data).then(() => {
        res.send({
            code: 200,
            data: {
                isSuccess: true,
            },
        })
    }).catch((err) => {
        res.send({
            code: 400,
            data: {
                isSuccess: false,
            },
        })
    });
}

// 登录
exports.signin = async (req, res) => {
    const data = req.body;
    await db_model.signin(data).then((result) => {
        if (result.length > 0) {
            // 生成token
            let _token = jwt.generateToken(data.name);// 这里的data.name是用户名s,可以随意传入
            res.send({
                code: 200,
                data: {
                    id: result[0].id,
                    token: _token,
                },
            })
        } else {
            res.send({
                code: 400,
            })
        }
    })
}