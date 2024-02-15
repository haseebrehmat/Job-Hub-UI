import axios from 'axios'
import { getToken } from './helpers'

const token = getToken() || null

const http = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
    },
})

const scrapperHttp = axios.create({
    baseURL: import.meta.env.VITE_SCRAPPER_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

export { http, scrapperHttp }
