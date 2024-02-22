import { http } from '@utils/http'

export const fetchCompanies = () =>
    http.get('/api/auth/company/').then(({ data }) => ({ companies: data, status: 'success' }))
