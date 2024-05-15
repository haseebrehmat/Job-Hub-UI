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

export const fetchStatusList = url => http.get(url).then(({ data }) => data)

export const fetchCompanyStatuses = url =>
    http.get(url).then(({ data }) => ({ statuses: data?.results, total: data?.count, pages: data?.num_pages }))

export const saveCompanyStatus = (url, { arg: { status_list } }) =>
    rawHttp
        .post(url, { status_list: status_list.map(({ value }) => value) })
        .then(({ data }) => toast.success(data.detail || 'Status are added successfully'))

export const fetchPhases = url =>
    http.get(url).then(({ data }) => ({ phases: data?.results, total: data?.count, pages: data?.num_pages }))

export const fetchCompanyStatusList = url => http.get(url).then(({ data }) => data)

export const savePhase = (url, { arg: phase }) => {
    if (phase?.id) {
        return rawHttp.put(url, phase).then(({ data }) => toast.success(data.detail || 'Phase is updated successfully'))
    }
    return rawHttp.post(url, phase).then(({ data }) => toast.success(data.detail || 'Phase is created successfully'))
}
