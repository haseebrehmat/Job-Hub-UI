import { http } from '@utils/http'

export const fetchHistory = url => http.get(url).then(({ data }) => data)
