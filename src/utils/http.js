import axios from 'axios'
import { checkToken, getBaseUrl, getMsg, getToken } from './helpers'
import { toast } from 'react-hot-toast'

const token = getToken()
const baseURL = getBaseUrl(import.meta.env.VITE_NODE_ENV)

const http = axios.create({
    baseURL,
    headers: { Accept: 'application/json' },
})

const rawHttp = axios.create({
    baseURL,
    headers: { Accept: 'application/json' },
})

http.interceptors.request.use(request => {
    if (token !== null) {
        checkToken()
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})

http.interceptors.response.use(
    response => response,
    error => {
        checkToken()
        toast.error(getMsg(error))
        Promise.reject(error)
    }
)

rawHttp.interceptors.request.use(request => {
    if (token !== null) {
        checkToken()
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})

const scrapperHttp = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
    },
})

const teamAppliedJobsHttp = axios.create({
    baseURL,
    headers: {
        Accept: 'application/json',
    },
})

export { http, rawHttp, scrapperHttp, teamAppliedJobsHttp }
