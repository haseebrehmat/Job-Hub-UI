import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { Loading } from '@components'

import { fetchJobs } from '@modules/jobPortal-v2/api'
import { JobCard } from '@modules/jobPortal-v2/components'

const JobPortalV2 = () => {
    const [page, query, filters] = useJobPortalV2Store(state => [state.page, state.query, state.filters])

    const { data, error, isLoading } = useSWR([page, query, filters], () => fetchJobs(page, query, filters), {
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    if (isLoading) return <Loading />
    return error ? (
        <span>Error to load Jobs</span>
    ) : (
        <div className='flex flex-col md:flex-row gap-2 px-2.5 h-full'>
            <div className='w-1/5 bg-slate-200 rounded-xl'>
                <div className='flex items-center justify-center h-full'>Filters</div>
            </div>
            <div className='w-4/5'>
                <div className='grid grid-cols-1 gap-2.5'>
                    {data?.jobs?.length > 0 ? (
                        data?.jobs?.map(row => <JobCard job={row} key={row?.id} />)
                    ) : (
                        <div>No Jobs Found</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(JobPortalV2)
