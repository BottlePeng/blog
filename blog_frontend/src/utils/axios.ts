import { baseUrl } from "./env";
import axios from "axios";
import { YkMessage } from "@yike-design/ui";

const service = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

// 添加请求拦截器
service.interceptors.request.use(
    // 在发动请求请求之前做一些处理
    (config) => {
        return config;
    },
    // 请求错误处理
    (error) => {
        YkMessage({
            type: "warning",
            content: error.message,
        })
        return Promise.reject();
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    // 请求成功处理
    (response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            YkMessage({
                type: "error",
                content: "请求失败",
            })
            return Promise.reject();
        }
    },
    (error) => {
        YkMessage({
            type: "error",
            content: error.message,
        })
        return Promise.reject();
    }
);

export default service;