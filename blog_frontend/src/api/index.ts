import fetch from '../utils/axios'

export const isRegisterApi = async () => {
    return await fetch.get('/isRegister')
}

export const signupApi = async (data: object) => {
    return await fetch.post('/signup', data)
}