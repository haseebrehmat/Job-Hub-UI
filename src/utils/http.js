import axios from 'axios'

export default axios.create({
    baseURL: 'https://d381-103-125-178-229.in.ngrok.io/',
    headers: {
        Accept: 'application/json',
    },
})
