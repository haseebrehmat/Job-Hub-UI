import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { fetchJobs } from '@modules/jobPortal-v2/api'
import { PortalLayout } from '@modules/jobPortal-v2/components'

const JobPortalV2 = () => {
    const [page, query, filters] = useJobPortalV2Store(state => [state.page, state.query, state.filters])

    const { data, error, isLoading } = useSWR([page, query, filters], () => fetchJobs(page, query, filters), {
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    console.log(data)

    return (
        <div className='w-1/5 bg-slate-200 rounded-xl'>
            <PortalLayout loading={isLoading} error={error} module='Filters'>
                <div className='flex items-center justify-center h-full'>Filters</div>
            </PortalLayout>
        </div>
    )
}

export default memo(JobPortalV2)
