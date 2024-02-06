import { http } from '@utils/http'
import { getMsg, saveToken, saveRefreshToken } from '@utils/helpers'

export const loginUser = (email, password) =>
    http
        .post('api/auth/login/', { email, password })
        .then(res => {
            saveToken(res.data.access)
            saveRefreshToken(res.data.refresh)
            return { status: 'success', message: 'User logged in successfully!' }
        })
        .catch(error => ({ status: 'error', message: getMsg(error) }))
