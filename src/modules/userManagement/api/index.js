import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchCompanies = url => http.get(url).then(({ data }) => ({ companies: data, status: 'success' }))
export const fetchBlacklistCompanies = url =>
    http
        .get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
        })
        .then(({ data }) => ({ companies: data, status: 'success' }))

export const saveCompany = (url, { arg: company }) => {
    if (company?.id) {
        return rawHttp
            .put(url, company)
            .then(({ data }) => toast.success(data.detail || 'Company updated successfully'))
    }
    return rawHttp.post(url, company).then(({ data }) => toast.success(data.detail))
}

export const fetchRoles = url => http.get(url).then(({ data }) => ({ roles: data.results, status: 'success' }))

export const fetchGroups = url => http.get(url).then(({ data }) => ({ groups: data, status: 'success' }))

export const fetchFixRoles = url => http.get(url).then(({ data }) => ({ fixedRoles: data, status: 'success' }))

export const saveRole = (url, { arg: role }) => {
    if (role?.id) {
        return rawHttp.put(url, role).then(({ data }) => toast.success(data.detail || 'Role updated successfully'))
    }
    return rawHttp.post(url, role).then(({ data }) => toast.success(data.detail))
}

export const fetchUsers = url =>
    http.get(url).then(({ data }) => ({
        users: data?.results,
        next: data?.next,
        prev: data?.previous,
        total: data?.count,
        status: 'success',
    }))

export const saveUser = (url, { arg: user }) => {
    if (user?.id) {
        return rawHttp.put(url, user).then(({ data }) => toast.success(data.detail || 'User updated successfully'))
    }
    return rawHttp.post(url, user).then(({ data }) => toast.success(data.detail))
}

export const fetchPermissions = url => http.get(url).then(({ data }) => ({ permissions: data, status: 'success' }))
