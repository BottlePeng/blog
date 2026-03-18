import fetch from '../utils/axios'

// 定义响应类型
export type SigninResponse = {
    code: number,
    data?: any
}

export const isRegisterApi = async () => {
    return await fetch.get<any, SigninResponse>('/isRegister')
}

export const signupApi = async (data: object) => {
    return await fetch.post<any, SigninResponse>('/signup', data)
}

export const signinApi = async (data: object) => {
    return await fetch.post<any, SigninResponse>('/signin', data)
}

export const overviewApi = async (data: object) => {
    return await fetch.post<any, SigninResponse>('/overview', data)
}