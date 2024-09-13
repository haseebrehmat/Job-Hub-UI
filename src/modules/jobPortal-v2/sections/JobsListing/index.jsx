import { memo, useEffect } from 'react'
import useSWR, { mutate as mutator } from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { fetchJobs } from '@modules/jobPortal-v2/api'
import { JobCard, PortalLayout } from '@modules/jobPortal-v2/components'

import { isset } from '@utils/helpers'

const JobsListing = () => {
    const [page, query, filters, focused, view, handleKeyDown, setMutator, setPagination] = useJobPortalV2Store(
        state => [
            state?.page,
            state?.paramQuery,
            state?.params,
            state?.focused,
            state?.view,
            state?.setFocused,
            state?.setMutator,
            state?.setPagination,
        ]
    )

    const { data, error, isLoading, mutate } = useSWR([page, query, filters], () => fetchJobs(page, query, filters), {
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
        onSuccess: fetchedData => setPagination(fetchedData?.next, fetchedData?.previous, mutator),
    })

    useEffect(() => {
        if (isset(handleKeyDown)) {
            window.addEventListener('keydown', e => handleKeyDown(e.key, data?.jobs?.length))
        }
        if (!isLoading && !error) setMutator(mutate)

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
