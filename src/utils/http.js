import axios from 'axios'

const http = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

const scrapperHttp = axios.create({
    baseURL: import.meta.env.VITE_SCRAPPER_API_URL,
    headers: {
        Accept: 'application/json',
    },
})

export { http, scrapperHttp }
