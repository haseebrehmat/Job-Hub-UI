import { getToken } from '@/utils/helpers'

const fetchJobs = async url => {
    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    })

    const {
        data,
        total_jobs,
        filtered_jobs,
        job_status_choice,
        tech_keywords_count_list,
        job_source_count_list,
        total_job_type,
        links,
        detail,
    } = await response.json()

    return {
        status: response.ok ? 'success' : 'error',
        jobsData: data,
        total_jobs,
        filtered_jobs,
        job_status_choice,
        tech_keywords_count_list,
        job_source_count_list,
        total_job_type,
        num_pages: links.num_pages,
        detail,
    }
}

const updateJobStatus = async (url, status, job) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ status, job }),
    })

    const { detail } = await response.json()

    return { status: response.ok ? 'success' : 'error', detail }
}

export { fetchJobs, updateJobStatus }
