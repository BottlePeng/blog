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

// 评论
export const commentsData = Mock.mock({
    "code": 200, //200-正常/300-未通过token验证/400-用户名或密码错误/500-服务器错误
    "data": [
        {
            "list|1-100": {
                "id|+1": 0, // 评论id
                "article": {
                    "id|+1": 0, // 文章id
                    "title": "@ctitle(3,12)"
                },
                "user": {
                    "id|+1": 0, // 用户id
                    "name": "@cname",
                    "imgurl": "https://www.huohuo90.com:3003/user/6353b034dd4b583975e77fbe.png",
                },
                "content": "@cparagraph(1,3)",
                "create_time": "@datetime('yyyy-MM-dd HH:mm:ss')"
            }
        }
    ]
})