import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchIntegrations = url =>
    http.get(url).then(({ data }) => ({ integrations: data.results, status: 'success' }))

export const saveIntegration = (url, { arg: integration }) => {
    if (integration?.id) {
        return rawHttp
            .put(url, integration)
            .then(({ data }) => toast.success(data.detail || 'Integration updated successfully'))
    }
    return rawHttp.post(url, integration).then(({ data }) => toast.success(data.detail))
}

export const fetchApiLogs = url =>
    http.get(url).then(({ data }) => ({ logs: data?.data, pages: data?.links?.num_pages }))

export const fetchRegions = url =>
    http.get(url).then(({ data }) => ({
        regions: data?.results,
        pages: data?.num_pages,
    }))

export const saveRegion = (url, { arg: region }) => {
    if (region?.id) {
        return rawHttp.put(url, region).then(({ data }) => toast.success(data.detail || 'Region updated successfully'))
    }
    return rawHttp.post(url, region).then(({ data }) => toast.success(data.detail))
}

export const saveTrend = (url, { arg: Trend }) => {
    if (Trend?.id) {
        return rawHttp.put(url, Trend).then(({ data }) => toast.success(data.detail || 'Trend updated successfully'))
    }
    return rawHttp.post(url, Trend).then(({ data }) => toast.success(data.detail))
}

export const fetchAllRegions = url => http.get(url).then(({ data }) => data)

export const fetchPermissions = url => http.get(url).then(({ data }) => data)

export const fetchTechStacks = url => http.get(url).then(({ data }) => data)
