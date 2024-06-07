import { http } from '@utils/http'
import { getMsg } from '@utils/helpers'

export const fetchTeamAppliedJobs = (page, applied_by = '') =>
    http
        .get(
            `api/job_portal/team_applied_job_details/?applied_by=${applied_by}&ordering=-applied_date&page=${page}&page_size=12`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
                },
            }
        )
        .then(
            ({
                data: {
                    data,
                    links,
                    filtered_jobs,
                    team_members,
                    last_12_hours_count,
                    job_source_analytics,
                    job_type_analytics,
                },
            }) => ({
                jobs: data,
                team_members,
                next: links.next,
                prev: links.previous,
                total: filtered_jobs,
                last_12_hours_count,
                job_source_analytics,
                job_type_analytics,
            })
        )
        .catch(error => ({ status: 'error', message: getMsg(error) }))
