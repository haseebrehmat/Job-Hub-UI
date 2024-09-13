import toast from 'react-hot-toast'

import { http } from '@utils/http'
import { isset } from '@utils/helpers'

const getFilterAppliedURL = filters =>
    `&tech_keywords=${filters?.techs?.map(tech => tech.label)?.join(',')}&job_source=${filters?.sources?.join(
        ','
    )}&ordering=${filters?.order ?? '-job_posted_date'}&job_visibility=${filters?.visible ?? 'all'}&from_date=${
        filters?.from
    }&to_date=${filters?.to}&job_type=${filters?.types?.join(',')}&blocked=${filters?.blocked}`

export const fetchJobs = (page = 1, query = '', filters = {}) => {
    let url = `api/job_portal/jobs/?page=${page}&search=${query}`

    if (isset(filters)) url += getFilterAppliedURL(filters)

    return http.get(url).then(({ data }) => ({ jobs: data?.results, next: data?.next, prev: data?.previous }))
}

export const fetchJobFilters = (query = '', filters = {}) => {
    let url = `api/job_portal/job_filters/?page=1&search=${query}`

    if (isset(filters)) url += getFilterAppliedURL(filters)

    return http.get(url).then(({ data }) => ({
        techStacks: data?.tech_keywords_count_list,
        jobSources: data?.job_source_count_list,
        jobTypes: data?.total_job_type,
    }))
}

export const downloadJobsData = async (query = '', filters = {}) => {
    let url = `api/job_portal/jobs/?page=1&search=${query}`

    if (isset(filters)) url += getFilterAppliedURL(filters)
    url += '&download=true'

    const { data } = await http.get(url)
    return toast.success(data || 'Export in progress, You will be notify through email', { icon: '🎉', duration: 2000 })
}
