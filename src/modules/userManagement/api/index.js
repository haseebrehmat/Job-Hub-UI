import { http, httpDev } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchCompanies = url => http.get(url).then(({ data }) => ({ companies: data, status: 'success' }))

export const saveCompany = (url, { arg: company }) =>
    httpDev.post(url, company).then(({ data }) => toast.success(data.detail))
