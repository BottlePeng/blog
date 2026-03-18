//============================数据库设计============================

// 用户
let users = `
    CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    email VARCHAR(100) NOT NULL COMMENT '邮箱',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    filesNum INT NOT NULL DEFAULT 0 COMMENT '文件数',
    articlesNum INT NOT NULL DEFAULT 0 COMMENT '文章数',
    PRIMARY KEY (id)
    ) COMMENT='用户';
`

//============================后台接口============================

// 是否有注册
// 地址: /isRegister
// 请求: Get
// 响应
export type res = {
    data?: {
        code: number, // 状态码 200表示成功 400表示失败
        isRegister: boolean, // 是否注册
    }
}

// 用户注册
// 地址: /signup
// 请求: POST
export type signup = {
    name: string,
    password: string,
}
// 响应
export type res = {
    code: number,
    data?: {
       isSuccess: boolean, // 是否成功注册
    }
}


// 用户登录
// 地址: /signin
// 请求: POST
export type signin = {
    name: string,
    password: string,
}
// 响应
export type res = {
    code: number,
    data?: {
        id: number,
        token: string,
    }
}


// 总览数据
// 地址: /overview
// 请求: POST
export type overview = {
    token: string,
}
// 响应
export type res = {
    code: number,
    data?: {
        files: string | number, // 文件总数
        atricles: number, // 文章总数
    }
}
