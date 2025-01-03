import { http } from '@utils/http'

export const fetchDashboardData = (from, to) =>
    http
        .get(`api/dashboard/dashboard_analytics/?from_date=${from}&to_date=${to}`)
        .then(({ data: { leads, statistics, tech_keywords_count_list } }) => ({
            leads,
            statistics,
            tech_jobs: tech_keywords_count_list,
            status: 'success',
        }))
