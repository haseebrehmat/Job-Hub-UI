import { teamAppliedJobsHttp } from '@utils/http'
import { getMsg } from '@utils/helpers'

export const fetchTeamAppliedJobs = (page, applied_by = '') =>
    teamAppliedJobsHttp
        .get(
            `api/job_portal/team_applied_job_details/?applied_by=${applied_by}&ordering=-job_posted_date&page=${page}&page_size=12`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
                },
            }
        )
        .then(({ data: { data, links, filtered_jobs, team_memmbers } }) => ({
            jobs: data,
            team_memmbers,
            next: links.next,
            prev: links.previous,
            total: filtered_jobs,
        }))
        .catch(error => ({ status: 'error', message: getMsg(error) }))
