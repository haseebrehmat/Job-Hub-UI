import { memo } from 'react'
import useSWR from 'swr'

import { useJobPortalV2Store } from '@/stores'

import { Filters } from '@components'

import { fetchJobFilters } from '@modules/jobPortal-v2/api'
import {
    PortalLayout,
    OrderBy,
    Visibility,
    TechStackDropdown,
    JobTypeChecks,
    JobSourceChecks,
    FromAndTo,
    Search,
    BlockedCheck,
} from '@modules/jobPortal-v2/components'

import { SWR_REVALIDATE } from '@constants/global'

const JobPortalV2 = () => {
    const [url, apply, reset] = useJobPortalV2Store(state => [
        state?.url?.filters,
        state?.applyFilters,
        state?.resetFilters,
    ])

    const { data, error, isLoading } = useSWR(url, fetchJobFilters, SWR_REVALIDATE)

    return (
        <div className='w-1/5 bg-slate-100 border border-slate-300 rounded-xl min-h-screen'>
            <PortalLayout loading={isLoading} error={error} module='Filters'>
                <div className='flex flex-col items-center justify-center px-3 py-5 gap-4 text-[#338d8c]'>
                    <Search />
                    <div className='w-full flex items-center gap-2 justify-evenly'>
                        <OrderBy />
                        <Visibility />
                    </div>
                    <FromAndTo />
                    <TechStackDropdown options={data?.techStacks} />
                    <JobTypeChecks jobTypes={data?.jobTypes} />
                    <JobSourceChecks jobSources={data?.jobSources} />
                    <BlockedCheck />
                    <div className='w-full'>
                        <Filters apply={() => apply()} clear={() => reset()} />
                    </div>
                </div>
            </PortalLayout>
        </div>
    )
}

export default memo(JobPortalV2)
