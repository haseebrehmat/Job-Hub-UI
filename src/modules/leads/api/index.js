import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchStatuses = url =>
    http.get(url).then(({ data }) => ({ statuses: data?.results, total: data?.count, pages: data?.num_pages }))

export const saveStatus = (url, { arg: status }) => {
    if (status?.id) {
        return rawHttp
            .put(url, status)
            .then(({ data }) => toast.success(data.detail || 'Status is updated successfully'))
    }
    return rawHttp.post(url, status).then(({ data }) => toast.success(data.detail || 'Status is created successfully'))
}
