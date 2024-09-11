import toast from 'react-hot-toast'

import { http } from '@utils/http'

import { isset } from '@utils/helpers'

const getFilterAppliedURL = filters =>
    `&tech_keywords=${filters?.techs?.map(tech => tech.value)}&job_source=${filters?.sources?.map(
        source => source.value
    )}&ordering=${filters?.order ?? '-job_posted_date'}&job_visibility=${filters?.visible ?? 'all'}&from_date=${
        filters?.from
    }&to_date=${filters?.to}&job_type=${filters?.types?.map(type => type.value)}&blocked=${filters?.blocked}`

export const fetchJobs = (page = 1, query = '', filters = {}) => {
    let url = `api/job_portal/job_details/?page=${page}&search=${query}`

    console.log(filters)

    if (isset(filters)) url += getFilterAppliedURL(filters)

    return http.get(url).then(({ data }) => ({ jobs: data?.data }))
}

export const fetchJobFilters = (query = '', filters = {}) => {
    let url = `api/job_portal/job_details/?page=1&search=${query}`

    if (isset(filters)) url += getFilterAppliedURL(filters)

    return http.get(url).then(({ data }) => ({
        techStacks: data?.tech_keywords_count_list,
        jobSources: data?.job_source_count_list,
        jobTypes: data?.total_job_type,
    }))
}

export const downloadJobsData = async (query = '', filters = {}) => {
    let url = `api/job_portal/job_details/?page=1&search=${query}`

    if (isset(filters)) url += getFilterAppliedURL(filters)
    url += '&download=true'

    const { data } = await http.get(url)
    return toast.success(data || 'Export in progress, You will be notify through email', { icon: '🎉', duration: 2000 })
}
