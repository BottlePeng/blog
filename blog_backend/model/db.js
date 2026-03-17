const mysql = require('mysql');
const config = require('../config/default');

// 链接数据库
const connetion = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD, 
});

// 直接连接
let query = (sql, values) => {
    return new Promise((resolve, reject) => {
        connetion.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

// 链接指定数据库
const pool = mysql.createPool({
    connectionLimit: 10,
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DB
});

// 通过 pool.getConnection 获取连接
let queryPool = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, values, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    connection.release(); // 释放连接
                    // connection.end(); // 关闭连接
                })
            }
        });
    });
};

// 数据库创建语句
let xxblog = `CREATE DATABASE IF NOT EXISTS ${config.database.DB} DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;`;

// 创建数据库
let creatDatabase = (db) => {
    return query(db,[]);
}

// 数据表
// 用户
let users = `
    CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL COMMENT '用户名',
    password VARCHAR(255) NOT NULL COMMENT '密码',
    filesNum INT NOT NULL DEFAULT 0 COMMENT '文件数',
    articlesNum INT NOT NULL DEFAULT 0 COMMENT '文章数',
    PRIMARY KEY (id)
    ) COMMENT='用户';
`

// 创建数据表
let createTable = (table) => {
    return query(table,[]);
}

// 创建数据库和数据表
async function creat() {
    await creatDatabase(xxblog);
    await createTable(users);
}

// 开启连接数据库
connetion.connect();