import toast from 'react-hot-toast'

import { http } from '@utils/http'

export const fetchJobs = url =>
    http.get(url).then(({ data }) => ({ jobs: data?.results, next: data?.next, prev: data?.previous }))

export const fetchJobFilters = url =>
    http.get(url).then(({ data }) => ({
        techStacks: data?.tech_keywords_count_list,
        jobSources: data?.job_source_count_list,
        jobTypes: data?.total_job_type,
    }))

export const downloadJobsData = async url => {
    url += '&download=true'
    const { data } = await http.get(url)
    return toast.success(data || 'Export in progress, You will be notify through email', { icon: '🎉', duration: 2000 })
}
