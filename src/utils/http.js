import axios from 'axios'

const http = axios.create({
    baseURL: 'https://851d-103-125-178-229.in.ngrok.io/',
    headers: {
        Accept: 'application/json',
    },
})

const scrapperHttp = axios.create({
    baseURL: 'http://10.10.9.124:8000/',
    headers: {
        Accept: 'application/json',
    },
})

export { http, scrapperHttp }
