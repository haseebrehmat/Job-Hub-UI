import { http } from '@utils/http'
import { getMsg } from '@utils/helpers'
import { toast } from 'react-hot-toast'

export const fetchTeamAppliedJobs = (page, download, applied_by = '') =>
    http
        .get(
            `api/job_portal/team_applied_job_details/?applied_by=${applied_by}&ordering=-applied_date&page=${page}&page_size=12&download=${download}`,
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

export const fetchTeamAppliedJobsPerHour = url =>
    http
        .get(url)
        .then(({ data }) => ({ results: data?.data, dates: data?.dates, min: data?.min_count, max: data?.max_count }))
export const downloadFilteredJobs = url =>
    http.get(url).then(({ data }) => toast.success(data || 'Your request has been submitted successflly '))

export const fetchDropdownVals = url => http.get(url).then(({ data }) => ({ data, status: 'success' }))
export const fetchLogs = url => http.get(url).then(({ data }) => ({ results: data.results, status: 'success' }))
