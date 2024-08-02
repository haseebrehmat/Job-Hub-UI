import jwt_decode from 'jwt-decode'
import { toPng } from 'html-to-image'

import {
    INTERVAL_TYPE_OPTIONS,
    JOB_SOURCE_OPTIONS,
    JOB_TYPES_OPTIONS,
    JOB_TYPES_OPTIONS_SMALLCASE,
    WEEK_DAYS_OPTIONS,
} from '@constants/scrapper'
import { validFileExtensions } from '@constants/profile'
import { GENERIC_SKILL_TYPES, GENERIC_SKILL_TYPES_OPTIONS, SOCIAL_PLATFORM_OPTIONS } from '@constants/pseudos'
import { today, year } from '@constants/dashboard'

export const saveToken = token => localStorage.setItem('token', JSON.stringify(token))

export const saveRefreshToken = token => localStorage.setItem('refresh-token', JSON.stringify(token))

export const getToken = () => JSON.parse(localStorage.getItem('token'))

export const removeToken = () => localStorage.removeItem('token')

export const decodeJwt = () => (getToken() ? jwt_decode(getToken()) : { user: null })

export const isSuper = () => decodeJwt()?.is_superuser

export const Id = () => decodeJwt()?.user_id

export const getMsg = error => error?.response?.data?.detail || 'Server error'

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
                        interval = seconds + 1
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

export const formatDate = date =>
    new Date(date).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })

export const formatDate2 = date =>
    new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })

export const formatDate3 = date =>
    new Date(date).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })

export const formatDate4 = date =>
    new Date(date ?? today).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })

export const formatDate5 = (dateString, format = 'yyyy-mm-dd') => {
    const date = new Date(dateString || today)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const yearr = date.getFullYear()
    let formattedDate = format
    formattedDate = formattedDate.replace('mm', (month < 10 ? '0' : '') + month)
    formattedDate = formattedDate.replace('dd', (day < 10 ? '0' : '') + day)
    formattedDate = formattedDate.replace('yyyy', yearr)
    return formattedDate
}

export const formatTime = (timeString, format = 'H:i') => {
    const date = new Date(timeString || today)
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    let formattedTime = format
    formattedTime = formattedTime.replace('H', hours)
    formattedTime = formattedTime.replace('i', (minutes < 10 ? '0' : '') + minutes)
    formattedTime = formattedTime.replace('s', (seconds < 10 ? '0' : '') + seconds)
    return formattedTime
}
export const checkToken = () => {
    const user = decodeJwt()
    if (!user?.user_id) {
        removeToken()
        window.location.href = '/login'
    }
    if (user.exp < Math.round(new Date().getTime() / 1000)) {
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

export const parseRoles = roles => roles.map(role => ({ value: role.id, label: role.name }))

export const parseSelectedRole = (id, roles) => {
    if (id) {
        const role = roles.find(row => row?.id === id)
        return { value: role?.id, label: role?.name }
    }
    return null
}

export const parseUsers = users => users.map(user => ({ value: user.id, label: user.username }))

export const parseSelectedUser = (id, users) => {
    if (id) {
        const user = users.find(row => row?.id === id)
        return { value: user?.id, label: user?.username }
    }
    return null
}

export const parseComapnies = companies => companies.map(company => ({ value: company.id, label: company.name }))

export const parseSelectedCompany = (id, companies) => {
    if (id) {
        const company = companies.find(row => row?.id === id)
        return { value: company?.id, label: company?.name }
    }
    return null
}

export const parseSelectedGroup = (id, groups) => {
    if (id) {
        const group = groups.find(row => row?.id === id)
        return { value: group?.id, label: group?.name }
    }
    return null
}

export const can = permissionKey => {
    const user = decodeJwt()
    const perms = user?.permissions
    if (Array.isArray(permissionKey)) {
        return permissionKey.some(key => perms?.includes(key))
    }
    return perms?.includes(permissionKey)
}

export const have = (value, inArray) => value.some(key => inArray?.includes(key))

export const transformPascal = str => str.replace(/([a-z])([A-Z])/g, '$1 $2')

export const removeOrAddElementsFromArray = (array, elements) => {
    const found = elements.filter(element => array.includes(element))
    if (found.length === elements.length) {
        elements.forEach(element => {
            array.splice(array.indexOf(element), 1)
        })
    } else {
        elements.forEach(element => {
            if (!array.includes(element)) {
                array.push(element)
            }
        })
    }
    return array
}

export const parseMembers = (members, leadId = null, all = false) => {
    const parsedMembers = members.filter(m => m.id !== leadId).map(user => ({ value: user.id, label: user.username }))
    if (all) parsedMembers.unshift({ value: 'all', label: 'All Team Members' })
    return parsedMembers
}

export const parsePseudos = pseudos =>
    pseudos?.map(pseudo => ({ value: pseudo.id, label: pseudo.name, verticals: pseudo.verticals }))

export const parseVertical = (pseudo, showStatus = false) =>
    pseudo?.verticals?.map(vertical => ({
        value: vertical.id,
        label: `${vertical.name} ${showStatus ? (vertical?.assigned ? '(assigned)' : '') : ''}`,
        isDisabled: vertical?.assigned,
    }))

export const dataForCsv = data =>
    data.map(obj => ({
        JOB_TITLE: obj.job_title,
        COMPANY: obj.company_name,
        Tech_Stack: obj.tech_keywords,
        Job_Type: obj.job_type,
        Date_Posted: obj.job_posted_date.slice(0, 10),
        Status: obj.job_status,
        Recruiter: obj.block,
        JOB_SOURCE: obj.job_source_url,
    }))

export const isValidFileTypeForAvatar = (fileName, fileType) =>
    fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1

export const convertFrom24To12Format = time24 => {
    if (time24) {
        const [sHours, minutes] = time24.match(/([0-9]{1,2}):([0-9]{2})/).slice(1)
        const period = +sHours < 12 ? 'AM' : 'PM'
        const hours = +sHours % 12 || 12
        return `On ${hours}:${minutes} ${period} daily`
    }
    return 'not-specified'
}

export const parseIntervalType = value => (value ? INTERVAL_TYPE_OPTIONS.find(row => row.value === value) : null)

export const parseJobSource = value => (value ? JOB_SOURCE_OPTIONS.find(row => row.value === value) : null)

export const parseJobType = value => (value ? JOB_TYPES_OPTIONS.find(row => row.value === value) : null)

export const parseJobType2 = value => (value ? JOB_TYPES_OPTIONS_SMALLCASE.find(row => row.value === value) : null)

export const parseTechKeywords = techStacks => techStacks.map(techStack => ({ value: techStack, label: techStack }))

export const parseTechKeyword = value => (value ? JOB_SOURCE_OPTIONS.find(row => row.value === value) : null)

export const parseSelectedTechKeyword = (value, techStacks) =>
    value ? techStacks.find(row => row.value === value) : null

export const formatStringInPascal = str => {
    if (!str) {
        return str
    }

    return str
        .split(' ')
        .map(item => {
            if (!item) {
                return item
            }
            return item[0].toUpperCase() + item.substr(1)
        })
        .join(' ')
}

export const parsePlatform = value => (value ? SOCIAL_PLATFORM_OPTIONS.find(row => row.value === value) : null)

export const replaceNewLine = str => str.replace(/\n/g, '<br>')

export const parseVerticals = (verticals, identity = false, regions = false) =>
    verticals?.map(vertical => ({
        value: vertical.id,
        label: `${vertical.name}${identity && vertical.identity ? ` - ${vertical.identity}` : ''} ${
            regions && vertical?.regions?.length > 0
                ? ` - ${vertical?.regions?.map(region => region.label).join(', ')}`
                : ''
        }`,
    }))

export const parseSelectedVertical = (id, verticals) => {
    if (id && verticals.length > 0) {
        const vertical = verticals.find(row => row?.id === id)
        return { value: vertical?.id, label: `${vertical.name}${vertical.identity ? ` - ${vertical.identity}` : ''}` }
    }
    return null
}

export const parseSelectedGenericSkillType = type => {
    if (type) {
        const genericSkillType = GENERIC_SKILL_TYPES_OPTIONS.find(row => row?.value === type)
        return { value: genericSkillType?.value, label: genericSkillType.label }
    }
    return null
}

export const parseSelectedGenericSkill = (id, genericSkills) => {
    if (id) {
        const genericSkill = genericSkills.find(row => row?.id === id)
        return {
            value: genericSkill?.id,
            label: `${genericSkill.name} - ${GENERIC_SKILL_TYPES[genericSkill.type] ?? 'N/A'}`,
        }
    }
    return null
}

export const parseGenericSkills = genericSkills =>
    genericSkills?.map(skill => ({
        value: skill.id,
        label: `${skill.name} - ${GENERIC_SKILL_TYPES[skill.type] ?? 'N/A'}`,
    }))

export const getSectionStatus = sections =>
    Object.keys(sections).reduce((acc, key) => {
        acc[key] = sections[key].status
        return acc
    }, {})

export const getSectionNames = sections =>
    Object.keys(sections).reduce((acc, key) => {
        acc[key] = sections[key].name
        return acc
    }, {})

export const parseTeams = teams => teams?.map(team => ({ value: team.id, label: team.name }))

export const parseSelectedTeam = (id, teams) => {
    if (id) {
        const team = teams.find(row => row?.id === id)
        return { value: team?.id, label: team?.name }
    }
    return null
}

export const getTeamVerticals = (teamId, data) => {
    if (teamId) {
        const result = data?.find(row => row.id === teamId)
        return result?.verticals ?? []
    }
    return []
}

export const parseStatuses = statuses => statuses?.map(status => ({ value: status.id, label: status.name }))

export const parseCompanyStatus = statuses => statuses?.map(row => ({ value: row.id, label: row?.status?.name }))

export const parseSelectedCompanyStatus = (id, statuses) => {
    if (id) {
        const status = statuses.find(row => row?.id === id)
        return { value: status?.id, label: status?.status?.name }
    }
    return null
}

export const parseSelectedStatus = (id, statuses) => {
    if (id) {
        const status = statuses.find(row => row?.id === id)
        return { value: status?.id, label: status?.name }
    }
    return null
}

export const parseStatusPhases = (id, statuses) =>
    id ? statuses?.find(row => row.id === id)?.phases.map(phase => ({ value: phase.id, label: phase.name })) : null

export const parseSelectedStatusPhase = (pid, sid, statuses) => {
    if (pid && sid) {
        const status = statuses.find(row => row?.id === sid)?.phases?.find(row => row.id === pid)
        return status ? { value: status?.id, label: status?.name } : null
    }
    return null
}

export const parseDesignations = designations =>
    designations.map(designation => ({
        value: designation.id,
        label: designation?.title,
        description: designation.description,
    }))

export const parseSelectedDesignation = designation => ({
    value: designation?.id,
    label: designation?.name,
    description: designation.description,
})

export const parseRegions = regions => regions?.map(region => ({ value: region.id, label: region.name }))

export const parseGroups = groups => groups.map(group => ({ value: group.id, label: formatStringInPascal(group.name) }))

export const getSelectedDays = days =>
    days ? WEEK_DAYS_OPTIONS.filter(({ value }) => days.includes(value)) : WEEK_DAYS_OPTIONS

export const formatNum = num => Intl.NumberFormat('en-US').format(num ?? 0)

export const getYearsOptions = () => {
    const years = []
    for (let i = 2000; i <= year; i++) {
        years.push({ value: i, label: i })
    }
    return years
}

export const htmlToPng = (htmlRef, options = null) =>
    new Promise((resolve, reject) => {
        toPng(htmlRef, { cacheBust: false, backgroundColor: options?.bgColor || 'white' })
            .then(dataUrl => {
                const link = document.createElement('a')
                link.download = `${options?.name || 'export'}.png`
                link.href = dataUrl
                link.click()
                resolve(dataUrl)
            })
            .catch(err => {
                console.log('Error ==>', err)
                reject(err)
            })
    })

export const getSelectedVals = options =>
    options?.length > 0 ? options?.map(m => m.value).join(',') : options?.value || ''

export const convertToTitleCase = str => {
    if (!str) {
        return str
    }
    const words = str.split('_')
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    const result = capitalizedWords.join(' ')
    return result
}

export const getWidthClass = index => {
    const widths = {
        0: 'w-[0%]',
        1: 'w-[20%]',
        2: 'w-[40%]',
        3: 'w-[60%]',
        4: 'w-[80%]',
        5: 'w-[100%]',
    }
    return widths[index]
}

export const findRegion = (region, regions) => {
    console.log(regions)
    region = region.toLowerCase()
    const R = regions.map(reg => reg.name)
    return R.includes(region)
}

export const findSkill = (skill, skills) => {
    console.log(skills)
    skill = skill.toLowerCase()
    const R = skills.map(reg => reg.name.toLowerCase())
    return R.includes(skill)
}

export const parseProjects = projects =>
    projects?.map(project => ({ name: project.name, description: project.description, tags: project.tags }))
