import jwt_decode from 'jwt-decode'
import { permissions } from '@constants/permissions'

export const saveToken = token => localStorage.setItem('token', JSON.stringify(token))

export const saveRefreshToken = token => localStorage.setItem('refresh-token', JSON.stringify(token))

export const getToken = () => JSON.parse(localStorage.getItem('token'))

export const removeToken = () => localStorage.removeItem('token')

export const decodeJwt = () => (getToken() ? jwt_decode(getToken()) : { user: null })

export const getMsg = error => error?.response?.data?.detail || 'Something went wrong'

export const getBaseUrl = nodeEnv => {
    switch (nodeEnv) {
        case 'dev':
            return import.meta.env.VITE_DEV_API_URL
        case 'prod':
            return import.meta.env.VITE_PROD_API_URL
        case 'stage':
            return import.meta.env.VITE_STAGE_API_URL
        case 'local':
            return import.meta.env.VITE_LOCAL_API_URL
        default:
            return import.meta.env.VITE_DEV_API_URL
    }
}

export const timeSince = date => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000)
    let intervalType = ''
    let interval = Math.floor(seconds / 31536000)
    if (interval >= 1) {
        intervalType = 'year'
    } else {
        interval = Math.floor(seconds / 2592000)
        if (interval >= 1) {
            intervalType = 'month'
        } else {
            interval = Math.floor(seconds / 86400)
            if (interval >= 1) {
                intervalType = 'day'
            } else {
                interval = Math.floor(seconds / 3600)
                if (interval >= 1) {
                    intervalType = 'hour'
                } else {
                    interval = Math.floor(seconds / 60)
                    if (interval >= 1) {
                        intervalType = 'minute'
                    } else {
                        interval = seconds
                        intervalType = 'second'
                    }
                }
            }
        }
    }
    if (interval > 1 || interval === 0) {
        intervalType += 's'
    }
    return `${interval} ${intervalType} ago`
}

export const formatDate = date => new Date(date).toLocaleString()

export const checkToken = () => {
    const { exp } = decodeJwt()
    if (Date(exp) < new Date()) {
        removeToken()
        window.location.href = '/login'
    }
}

export const handle401 = error => {
    const { status, statusText } = error.response
    if (status === 401 && statusText === 'Unauthorized') {
        removeToken()
        window.location.href = '/login'
    }
}

export const parseFixedRoles = roles =>
    roles.map(role => ({ value: role.code, label: `${role.code} -- ${role.description}` }))

export const parseSelectedRole = (code, roles) => {
    if (code) {
        const role = roles.find(row => row?.code === code)
        return { value: role?.code, label: `${role?.code} -- ${role?.description}` }
    }
    return null
}

export const parseRoles = roles => roles.map(role => ({ value: role.id, label: role.name }))

export const parseComapnies = companies => companies.map(company => ({ value: company.id, label: company.name }))

export const parseGroups = groups => groups.map(group => ({ value: group.id, label: group.name }))

export const parseSelectedGroup = (id, groups) => {
    if (id) {
        const group = groups.find(row => row?.id === id)
        return { value: group?.id, label: group?.name }
    }
    return null
}

export const can = permissionKey => {
    const user = decodeJwt()
    const perms = user?.permissionss || permissions
    if (Array.isArray(permissionKey)) {
        return permissionKey.some(key => perms.includes(key))
    }
    return perms.includes(permissionKey)
}

export const transformPascal = str => str.replace(/([a-z])([A-Z])/g, '$1 $2')
