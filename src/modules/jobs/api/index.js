import { teamAppliedJobsHttp } from '@utils/http'
import { getMsg } from '@utils/helpers'

export const fetchTeamAppliedJobs = (page, query = '') =>
    teamAppliedJobsHttp
        .get(
            `api/job_portal/team_applied_job_details/?applied_by=223dc6ca-e97a-4cc4-85c8-0b290192b25c&ordering=-job_posted_date&page=${page}&page_size=12&search=${query}`,
            {
                headers: {
                    Authorization: import.meta.env.AUTHORIZATION,
                },
            }
        )
        .then(({ data: { data, links, filtered_jobs } }) => ({
            jobs: data,
            next: links.next,
            prev: links.previous,
            total: filtered_jobs,
        }))
        .catch(error => ({ status: 'error', message: getMsg(error) }))
