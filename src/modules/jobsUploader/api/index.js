import { checkToken, getToken } from '@utils/helpers'
import { http } from '@utils/http'

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

export default uploadJobs
