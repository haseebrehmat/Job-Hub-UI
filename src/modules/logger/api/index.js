import { http } from '@utils/http'

export const fetchErrorLogs = url => http.get(url).then(({ data }) => ({ errors: data, status: 'success' }))
