import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { Loading } from '@components'

import { fetchJobs } from '@modules/jobPortal-v2/api'
import { JobCard } from '@modules/jobPortal-v2/components'

const JobsListing = () => {
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
        <div className='w-4/5'>
            <div className='grid grid-cols-1 gap-2.5'>
                {data?.jobs?.length > 0 ? (
                    data?.jobs?.map(row => <JobCard job={row} key={row?.id} />)
                ) : (
                    <div>No Jobs Found</div>
                )}
            </div>
        </div>
    )
}

export default memo(JobsListing)
