import { memo } from 'react'
import useSWR from 'swr'

import {
    JobsComparison,
    ThrivingSources,
    DecliningSources,
    ThrivingTechnologies,
    DecliningTechnologies,
    ThrivingJobTitles,
} from '@modules/dashboard/components'
import { fetchJobStats } from '@modules/dashboard/api'

import { isSuper } from '@utils/helpers'

const Dashboard = () => {
    const allowed = isSuper()

    const { data, isLoading, error } = useSWR(`/api/job_portal/trending_jobs_stats/`, fetchJobStats)

    return allowed && !error ? (
        isLoading ? (
            <h1 className='mx-auto p-4 text-[#4f9d9b] text-lg'>Loading Trending Jobs Stats....</h1>
        ) : (
            <div className='grid lg:grid-cols-2'>
                <JobsComparison data={data?.jobs?.month} />
                <ThrivingSources data={data?.thriving_sources?.month} relative={data?.thriving_source_status} />
                <DecliningSources data={data?.declining_sources?.month} relative={data?.declining_source_status} />
                <ThrivingTechnologies
                    data={data?.thriving_tech_stacks?.month}
                    relative={data?.thriving_tech_stack_status}
                />
                <DecliningTechnologies
                    data={data?.declining_tech_stacks?.month}
                    relative={data?.declining_tech_stack_status}
                />
                <ThrivingJobTitles data={data?.thriving_titles?.month} />
            </div>
        )
    ) : null
}

export default memo(Dashboard)
