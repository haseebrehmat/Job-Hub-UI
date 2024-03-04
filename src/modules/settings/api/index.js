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
