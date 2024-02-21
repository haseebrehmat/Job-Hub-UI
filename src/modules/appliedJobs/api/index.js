import { http } from '@utils/http'

export const fetchAppliedJobs = (page, query = '') =>
    http
        .get(`api/job_portal/applied_job_details/?&ordering=-job_posted_date&page=${page}&page_size=12&search=${query}`)
        .then(({ data: { data, links, filtered_jobs } }) => ({
            jobs: data,
            next: links.next,
            prev: links.previous,
            total: filtered_jobs,
            status: 'success',
        }))
