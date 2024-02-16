import axios from 'axios'
import { getToken } from './helpers'

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
