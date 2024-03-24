import { checkToken, getToken } from '@utils/helpers'
import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

const uploadJobs = async (url, formData) => {
    checkToken()
    const response = await fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    })

    const { detail } = await response.json()
    return { status: response.ok ? 'success' : 'error', detail }
}

export const fetchManualJobs = url => http.get(url).then(({ data }) => ({ jobs: data, status: 'success' }))

export const jobPost = (url, { arg: job }) => rawHttp.post(url, job).then(({ data }) => toast.success(data.detail))

export const fetchTechStacks = url =>
    http.get(url).then(({ data }) => ({ techStacks: data.keywords, status: 'success' }))

export default uploadJobs
