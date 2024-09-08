import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { Loading } from '@components'

import { fetchJobs } from '@modules/jobPortal-v2/api'

const JobPortalV2 = () => {
    const [page, query, filters] = useJobPortalV2Store(state => [state.page, state.query, state.filters])

    const { data, error, isLoading } = useSWR([page, query, filters], () => fetchJobs(page, query, filters), {
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    console.log(data)
    if (isLoading) return <Loading />
    return error ? (
        <span>Error to load filters</span>
    ) : (
        <div className='w-1/5 bg-slate-200 rounded-xl'>
            <div className='flex items-center justify-center h-full'>Filters</div>
        </div>
    )
}

export default memo(JobPortalV2)
