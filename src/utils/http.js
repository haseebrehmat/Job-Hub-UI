import axios from 'axios'

const http = axios.create({
    baseURL: 'https://851d-103-125-178-229.in.ngrok.io/',
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
