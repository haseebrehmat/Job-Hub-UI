import { http } from '@utils/http'

export const fetchAppliedJobs = (page, query = '', user_id = '') =>
    http
        .get(
            `api/job_portal/applied_job_details/?&ordering=-job_posted_date&page=${page}&page_size=12&search=${query}&user_id=${user_id}`
        )
        .then(({ data: { data, links, filtered_jobs, last_12_hours_count } }) => ({
            jobs: data,
            next: links.next,
            prev: links.previous,
            total: filtered_jobs,
            last_12_hours_count,
            status: 'success',
        }))
