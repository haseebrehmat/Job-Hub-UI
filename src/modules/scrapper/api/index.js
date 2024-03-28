import { toast } from 'react-hot-toast'

import { http, rawHttp } from '@utils/http'

export const syncNow = url => http.get(url).then(({ data }) => toast.success(data.detail))

export const fetchCronjobSettings = url => http.get(url).then(({ data }) => ({ settings: data, status: 'success' }))

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
