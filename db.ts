//============================数据库设计============================

// 用户
let users = `
    CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    email VARCHAR(100) NOT NULL COMMENT '邮箱',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    created_at DATETIME NOT NULL COMMENT '创建时间',
    imgurl VARCHAR(100) COMMENT '头像',
    PRIMARY KEY (id)
    ) COMMENT='用户';
`

// 本地文件
let files = `
    CREATE TABLE IF NOT EXISTS files (
    id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(100) NOT NULL COMMENT '地址',
    file_name INT NOT NULL COMMENT '文件名',
    format VARCHAR(10) NOT NULL COMMENT '格式',
    mament DATETIME NOT NULL COMMENT '创建时间',
    PRIMARY KEY (id),
    ) COMMENT='本地文件';
`

// 文章
let articles = `
    CREATE TABLE IF NOT EXISTS articles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL COMMENT '标题',
    introduce VARCHAR(1000) NOT NULL COMMENT '简介',
    content TEXT NOT NULL COMMENT '内容',
    cover VARCHAR(100) NOT NULL COMMENT '封面地址',
    views INT NOT NULL DEFAULT 0 COMMENT '查看次数',
    state INT NOT NULL DEFAULT 0 COMMENT '文章状态',
    moment DATETIME NOT NULL COMMENT '创建时间',
    PRIMARY KEY (id),
    ) COMMENT='文章';
`
// 文章点赞
let praises = `
    CREATE TABLE IF NOT EXISTS praises (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL COMMENT '所属用户id',
    user_type INT NOT NULL COMMENT '查看次数',
    article_id INT NOT NULL COMMENT '所属文章id',
    moment DATETIME NOT NULL COMMENT '创建时间',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
    ) COMMENT='文章点赞';
`
// 文章评论
let comments = `
    CREATE TABLE IF NOT EXISTS comments (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL COMMENT '所属用户id',
    user_type INT NOT NULL COMMENT '查看次数',
    article_id INT NOT NULL COMMENT '所属文章id',
    moment DATETIME NOT NULL COMMENT '创建时间',
    content TEXT NOT NULL COMMENT '内容',
    PRIMARY KEY (id),
    FOREIGN KEY (article_id) REFERENCES articles(id)
    ) COMMENT='文章评论';
`

// 埋点
let record = `
    CREATE TABLE IF NOT EXISTS record ( 
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL COMMENT '所属用户id',
    user_type INT NOT NULL COMMENT '用户类型0-登录用户,1-游客',
    moment DATETIME NOT NULL COMMENT '创建时间',
    position VARCHAR(100) NOT NULL COMMENT '访问位置',
    device VARCHAR(100) NOT NULL COMMENT '设备类型0-PC,1-移动端',
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
    ) COMMENT='埋点';
`

//============================后台接口============================

// 用户登录
// 地址: /signin
// 请求: POST
export type signin = {
    name: string,
    password: string,
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        id: number,
        name: string,
        imgurl: string, // 头像
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
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        files: string | number, // 文件总数
        atricles: number, // 文章总数
        praises: number, // 文章点赞总数
        comments: number, // 文章评论总数
    }
}


// 访问量
// 地址: /visits
// 请求: POST
export type visits = {
    token: string,
    length: number, // 时间长度
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        data: string,   // 日期
        count: number, // 访问量
    }
}


// 数据监测
// 地址: /survey
// 请求: POST
export type survey = {
    token: string,
    length: number, // 时间长度
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {// 不同设备
        key: 'nobile' | 'pc',
        value: number,
    }[];
}


// 评论
// 地址: /comments
// 请求: POST
export type comments = {
    token: string,
    pageSize: number, // 每页数量
    nowPage: number, // 页码
    count?: boolean, // 是否统计总数
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        list: {
            id: number,
            article?:{
                id: number,
                title: string,
            },
            user: {
                id: string | number,
                name: string,
                imgurl: string,
            },
            content: string,
            moment: string,
        }[],
    }
}


// 文章/文章搜索
// 地址: /articles
// 请求: POST
export type articles = {
    token: string,
    pageSize: number, // 每页数量
    nowPage: number, // 页码
    state?: number, // 文章状态
    serchTerm?: string | number, // 搜索关键字
    count?: boolean, // 是否统计总数
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        count?: number, // 文章总数
        list: {
            id: number,
            title: string,
            moment: string,
            introduce?: string, // 简介
            cover?: string, // 封面地址
            views: number, // 查看次数
            state: number, // 文章状态
            commonts: number, // 评论次数
            praises: number, // 点赞次数
        }[],
    }
}


// 文章发布/文章撤回
// 地址: /changeArticleState
// 请求: POST
export type changeArticleState = {
    token: string,
    acticleId: number,
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
}

// 文章状态(已发布/未发布)
// 地址: /articleState
// 请求: POST
export type articleState = {
    token: string,
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        id: number,
        name: '已发布' | '未发布',
        value: number,
    }[];
}


// 文章新建
// 地址: /createArticle
// 请求: POST
export type createArticle = {
    token: string,
    title: string,
    introduce?: string, // 简介
    content?: string,
    cover?: string,
    state: number, // 文章状态
    monent: string, // 创建时间
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
}


// 文章获取
// 地址: /getArticle
// 请求: POST
export type getArticle = {
    token: string,
    articleId: number,
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        id: number,
        title: string,
        introduce?: string,
        content?: string,
        cover?: string,
    }
}


// 文章修改
// 地址: /editArticle
// 请求: POST
export type editArticle = {
    token: string,
    articleId: number,
    title: string,
    introduce?: string, // 简介
    content?: string,
    cover?: string,
    state: number, // 文章状态
    monent: string, // 创建时间
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
}


// 文件
// 地址: /files
// 请求: POST
export type files = {
    token: string,
    pageSize: number, // 每页数量
    nowPage: number, // 页码
    count?: boolean, // 是否统计总数
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        count?: number, // 文件总数
        list: {
            id: number,
            url: string,
            fileName: string,
            format: string,
        }[],
    }
}


// 上传文件
// 地址: /uploadFile
// 请求: POST
export type uploadFile = {
    token: string,
    formData: FormData,
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    data?: {
        id: number,
        url: string, // 文件地址
        fileName: string, // 文件名
        format: string, // 文件格式
    }[],
}   


// 删除文件
// 地址: /deleteFiles
// 请求: POST
export type deleteFiles = {
    token: string,
    fileIds: number[],
}
// 响应
export type res = {
    code: number, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
}