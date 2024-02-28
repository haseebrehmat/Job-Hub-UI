import { http, httpDev } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchCompanies = url => http.get(url).then(({ data }) => ({ companies: data, status: 'success' }))

export const saveCompany = (url, { arg: company }) => {
    if (company?.id) {
        return httpDev
            .put(url, company)
            .then(({ data }) => toast.success(data.detail || 'Company updated successfully'))
    }
    return httpDev.post(url, company).then(({ data }) => toast.success(data.detail))
}

export const fetchRoles = url => http.get(url).then(({ data }) => ({ roles: data, status: 'success' }))

export const fetchFixRoles = url => http.get(url).then(({ data }) => ({ fixedRoles: data, status: 'success' }))

export const saveRole = (url, { arg: role }) => {
    if (role?.id) {
        return httpDev.put(url, role).then(({ data }) => toast.success(data.detail || 'Role updated successfully'))
    }
    return httpDev.post(url, role).then(({ data }) => toast.success(data.detail))
}

export const fetchUsers = url => http.get(url).then(({ data }) => ({ users: data, status: 'success' }))

export const saveUser = (url, { arg: user }) => {
    if (user?.id) {
        return httpDev.put(url, user).then(({ data }) => toast.success(data.detail || 'User updated successfully'))
    }
    return httpDev.post(url, user).then(({ data }) => toast.success(data.detail))
}
