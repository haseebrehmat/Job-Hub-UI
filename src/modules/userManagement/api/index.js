import { http } from '@utils/http'

export const fetchCompanies = url => http.get(url).then(({ data }) => ({ companies: data, status: 'success' }))

export const saveCompany = (url, { arg: company }) =>
    http.post(url, company).then(({ data }) => ({ msg: data.detail, status: 'success' }))
