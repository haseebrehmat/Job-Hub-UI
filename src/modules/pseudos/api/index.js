import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchPseudos = url => http.get(url).then(({ data }) => ({ pseudos: data.results, status: 'success' }))

export const savePseudo = async (url, { arg: pseudo }) => {
    if (pseudo?.id) {
        const { data } = await rawHttp.put(url, pseudo)
        return toast.success(data.detail || 'Pseudo updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, pseudo)
    return toast.success(data_1.detail || 'Pseudo created successfully')
}

export const saveVertical = async (url, { arg: vertical }) => {
    const { data } = await rawHttp.post(url, vertical)
    return toast.success(data.detail || 'Vertical created successfully')
}

export const fetchBasicInfo = url => http.get(url).then(({ data }) => data)

export const updateBasicInfo = async (url, { arg: pseudo }) => {
    const { data } = await rawHttp.put(url, pseudo)
    return toast.success(data.detail || 'Pseudo updated successfully')
}

export const fetchSkills = url => http.get(url).then(({ data }) => data.results)

export const saveSkill = async (url, { arg: skill }) => {
    if (skill?.id) {
        const { data } = await rawHttp.put(url, skill)
        return toast.success(data.detail || 'Skill updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, skill)
    return toast.success(data_1.detail || 'Skill created successfully')
}

export const fetchExperiences = url => http.get(url).then(({ data }) => data.results)

export const saveExperience = async (url, { arg: experience }) => {
    if (experience?.id) {
        const { data } = await rawHttp.put(url, experience)
        return toast.success(data.detail || 'Experience updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, experience)
    return toast.success(data_1.detail || 'Experience created successfully')
}

export const fetchEducations = url => http.get(url).then(({ data }) => data.results)

export const saveEducation = async (url, { arg: education }) => {
    if (education?.id) {
        const { data } = await rawHttp.put(url, education)
        return toast.success(data.detail || 'Education updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, education)
    return toast.success(data_1.detail || 'Education created successfully')
}

export const fetchLanguages = url => http.get(url).then(({ data }) => data.results)

export const saveLanguage = async (url, { arg: language }) => {
    if (language?.id) {
        const { data } = await rawHttp.put(url, language)
        return toast.success(data.detail || 'Language updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, language)
    return toast.success(data_1.detail || 'Language created successfully')
}

export const fetchLinks = url => http.get(url).then(({ data }) => data.results)

export const saveLink = async (url, { arg: link }) => {
    if (link?.id) {
        const { data } = await rawHttp.put(url, link)
        return toast.success(data.detail || 'Link updated successfully')
    }
    const { data: data_1 } = await rawHttp.post(url, link)
    return toast.success(data_1.detail || 'Link created successfully')
}
