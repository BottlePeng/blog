import Mock from 'mockjs'
const Random = Mock.Random

// 总览数据
export const overviewData = Mock.mock({
    "code": 200, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    "data": {
        "files": Random.float(60, 100, 0, 2)+'M', // 文件大小
        "atricles|0-50": 0, // 文章总数
    }
})