let baseUrl = "";

if (process.env.NODE_ENV === "development") {
    // 开发环境
    baseUrl = "http://localhost:3000";
} else if (process.env.NODE_ENV === "production") {
    // 生产环境/服务器
    baseUrl = "https://example.com:3000";
}

export {
    baseUrl
};