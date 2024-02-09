import axios from 'axios'

const http = axios.create({
    baseURL: 'http://18.144.164.235:8000/',
    headers: {
        Accept: 'application/json',
    },
})

const scrapperHttp = axios.create({
    baseURL: 'http://54.183.171.9/',
    headers: {
        Accept: 'application/json',
    },
})

export { http, scrapperHttp }
