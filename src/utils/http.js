import axios from 'axios'
import { getToken, removeToken } from './helpers'

const token = getToken()

const headers = {
    Accept: 'application/json',
}

if (token !== null) {
    headers.Authorization = `Bearer ${token}`
}

const http = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers,
})

http.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response)
        }
        return Promise.reject(response)
    },
    error => {
        Promise.reject(error)
        removeToken()
        window.location.href = '/login'
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
