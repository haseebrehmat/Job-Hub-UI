import { http, rawHttp } from '@utils/http'
import { toast } from 'react-hot-toast'

export const fetchAppliedJobs = (page, query = '', user_id = '') => {
    const url =
        user_id?.length > 0
            ? `api/job_portal/applied_job_details/?&ordering=-job_posted_date&page=${page}&page_size=12&search=${query}&user_id=${user_id}`
            : `api/job_portal/applied_jobs/?&ordering=-job_posted_date&page=${page}&page_size=12&search=${query}&user_id=${user_id}`

    return http.get(url).then(({ data: { data, links, filtered_jobs, last_12_hours_count } }) => ({
        jobs: data,
        next: links?.next,
        prev: links?.previous,
        total: filtered_jobs,
        last_12_hours_count,
        status: 'success',
    }))
}

export const fetchStatusPhases = url => http.get(url).then(({ data }) => data)

export const convertToLead = (url, { arg: lead }) =>
    rawHttp
        .post(url, lead)
        .then(({ data }) => toast.success(data.detail || 'Applied Job is converted to Lead successfully'))

export const fetchSelectedCandidates = url =>
    http.get(url).then(({ data }) => ({
        candidates: data?.results,
        skills: data?.skills,
        designations: data?.designations,
        regions: data?.regions,
        total: data?.count,
        pages: data?.num_pages,
    }))
