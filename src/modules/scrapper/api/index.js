import { toast } from 'react-hot-toast'

import { http, rawHttp } from '@utils/http'

export const syncNow = (url, { arg: { link } }) => http.get(link).then(({ data }) => toast.success(data.detail))

export const fetchCronjobSettings = url => http.get(url).then(({ data }) => ({ settings: data, status: 'success' }))

export const fetchJobLogs = url => http.get(url).then(({ data }) => ({ logs: data, status: 'success' }))

export const saveCronjobSetting = (url, { arg: setting }) => {
    if (setting?.id) {
        return rawHttp
            .put(url, setting)
            .then(({ data }) => toast.success(data.detail || 'Cronjob Setting updated successfully'))
    }
    return rawHttp
        .post(url, setting)
        .then(({ data }) => toast.success(data.detail || 'Cronjob Setting created successfully'))
}

export const fetchJobSourceLinks = url => http.get(url).then(({ data }) => ({ links: data?.detail, status: 'success' }))

export const saveJobSourceLink = (url, { arg: link }) => {
    if (link?.id) {
        return rawHttp
            .put(url, link)
            .then(({ data }) => toast.success(data.detail || 'Job Source Link updated successfully'))
    }
    return rawHttp
        .post(url, link)
        .then(({ data }) => toast.success(data.detail || 'Job Source Link created successfully'))
}

export const fetchScraperStatus = url => http.get(url).then(({ data }) => data)

export const getScrapperCycleStatus = url => http.get(url).then(({ data }) => data)

export const toggleScrapperCycleStatus = url => {
    rawHttp
        .post(url)
        .then(data =>
            toast.success(`${data.data[0] === 'Sync stopped' ? 'Scrapper Cycle Stopped' : 'Scrapper Cycle Started'} `)
        )
}
