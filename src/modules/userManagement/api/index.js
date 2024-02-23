import { http, httpDev } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchCompanies = url => http.get(url).then(({ data }) => ({ companies: data, status: 'success' }))

export const saveCompany = (url, { arg: company }) => {
    if (company?.id) {
        return httpDev.put(url, company).then(({ data }) => toast.success(data.detail))
    }
    return httpDev.post(url, company).then(({ data }) => toast.success(data.detail))
}
