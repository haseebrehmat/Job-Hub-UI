import { http } from '@utils/http'

import { isset } from '@utils/helpers'

export const fetchJobs = (page = 1, query = '', filters = {}) => {
    let url = `api/job_portal/job_details/?page=${page}&search=${query}`

    if (isset(filters)) {
        url += `&tech_keywords=${filters?.techs?.map(tech => tech.value)}&job_source=${filters?.sources?.map(
            source => source.value
        )}&ordering=${filters?.order ?? '-job_posted_date'}&job_visibility=${filters?.visible ?? 'all'}&from_date=${
            filters?.from
        }&to_date=${filters?.to}&job_type=${filters?.types?.map(type => type.value)}&blocked=${filters?.blocked}`
    }

    return http.get(url).then(({ data }) => data)
}
