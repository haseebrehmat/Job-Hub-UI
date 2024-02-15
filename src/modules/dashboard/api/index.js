import { http } from '@utils/http'
import { getMsg } from '@utils/helpers'

export const fetchDashboardData = (from, to) =>
    http
        .get(`api/dashboard/dashboard_analytics/?from_date=${from}&to_date=${to}`)
        .then(({ data: { leads, statistics, tech_keywords_count_list } }) => ({
            leads,
            statistics,
            tech_jobs: tech_keywords_count_list,
        }))
        .catch(error => ({ status: 'error', message: getMsg(error) }))
