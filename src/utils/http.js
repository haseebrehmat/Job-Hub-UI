import axios from 'axios'
import { getMsg, getToken } from './helpers'
import { toast } from 'react-hot-toast'

const token = getToken()

const http = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

http.interceptors.request.use(request => {
    if (token !== null) request.headers.Authorization = `Bearer ${token}`
    return request
})

http.interceptors.response.use(
    response => response,
    error => {
        toast.error(getMsg(error))
        Promise.reject(error)
        if (token === null) window.location.href = '/login'
    }
)

const scrapperHttp = axios.create({
    baseURL: import.meta.env.VITE_SCRAPPER_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

const teamAppliedJobsHttp = axios.create({
    baseURL: import.meta.env.VITE_SCRAPPER_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

export { http, scrapperHttp, teamAppliedJobsHttp }
