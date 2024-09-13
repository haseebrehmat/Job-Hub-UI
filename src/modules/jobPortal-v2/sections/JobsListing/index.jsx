import { memo, useEffect } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { fetchJobs } from '@modules/jobPortal-v2/api'
import { JobCard, PortalLayout } from '@modules/jobPortal-v2/components'

import { isset } from '@utils/helpers'
import { SWR_REVALIDATE } from '@constants/global'

const JobsListing = () => {
    const [url, focused, view, handleKeyDown, setMutator, setPagination] = useJobPortalV2Store(state => [
        state?.url?.jobs,
        state?.focused,
        state?.view,
        state?.setFocused,
        state?.setMutator,
        state?.setPagination,
    ])

    const { data, error, isLoading, mutate } = useSWR(url, fetchJobs, SWR_REVALIDATE)

    useEffect(() => {
        if (isset(handleKeyDown)) {
            window.addEventListener('keydown', e => handleKeyDown(e.key, data?.jobs?.length))
        }
        if (!isLoading && !error) {
            setMutator(mutate)
            if (isset(data?.next) || isset(data?.previous)) setPagination(data?.next, data?.previous)
        }

        return () => {
            window.removeEventListener('keydown', e => handleKeyDown(e.key, data?.jobs?.length))
        }
    }, [data])

    return (
        <PortalLayout loading={isLoading} error={error} module='Jobs'>
            <div className={`grid ${view === 'grid' ? 'grid-cols-2 gap-4' : 'grid-cols-1 gap-2.5'}`}>
                {data?.jobs?.length > 0 ? (
                    data?.jobs?.map((row, index) => <JobCard job={row} key={row?.id} active={focused === index} />)
                ) : (
                    <div>No Jobs Found</div>
                )}
            </div>
        </PortalLayout>
    )
}

export default memo(JobsListing)
