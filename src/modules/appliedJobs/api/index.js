import { scrapperHttp } from '@utils/http'
import { getMsg } from '@utils/helpers'

export const fetchAppliedJobs = page =>
    scrapperHttp
        .get(`applied_job_details/?job_status=1&ordering=-job_posted_date&page=${page}&page_size=12`)
        .then(({ data: { data, links, filtered_jobs } }) => ({
            jobs: data,
            next: links.next,
            prev: links.previous,
            total: filtered_jobs,
        }))
        .catch(error => ({ status: 'error', message: getMsg(error) }))
