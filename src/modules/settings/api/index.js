import { http } from '@utils/http'

export const fetchIntegrations = url =>
    http.get(url).then(({ data }) => ({ integrations: data.results, status: 'success' }))
