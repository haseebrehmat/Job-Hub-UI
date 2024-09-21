import { memo } from 'react'
import useSWR from 'swr'

import { useDynamicJobSourcesStore } from '@/stores'

import { Loading, Button, Searchbox } from '@components'

import { JobSourceActions, JobSourceForm } from '@modules/settings/components'
import { fetchJobSources } from '@modules/settings/api'

import { can } from '@utils/helpers'
import { SWR_REVALIDATE } from '@constants/global'

import { CreateIcon } from '@icons'

const JobSources = () => {
    const [show, query, setSource, setQuery] = useDynamicJobSourcesStore(state => [
        state?.show,
        state?.query,
        state?.setSource,
        state?.setQuery,
    ])

    const { data, error, isLoading, mutate } = useSWR(
        `/api/job_scraper/job_source/?search=${query}`,
        fetchJobSources,
        SWR_REVALIDATE
    )

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5 hide_scrollbar'>
            <div className='flex items-center pt-3 pb-6 justify-between'>
                <div className='flex space-x-3 items-center'>
                    <Searchbox query={query} setQuery={input => setQuery(input)} />
                </div>
                {can('create_job_source') && (
                    <Button label='Add Job Source' fit icon={CreateIcon} onClick={() => setSource(null)} />
                )}
            </div>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
                {data?.sources?.length > 0 && !error ? (
                    data?.sources?.map((row, idx) => (
                        <div
                            className='bg-white border border-[#048C8C] rounded-md p-4 relative hover:bg-slate-100'
                            key={idx}
                        >
                            <h2 className='text-lg'>{row?.name ?? 'Not Specified'}</h2>
                            <h2 className='text-sm pl-1'>{row?.key ?? 'Not Specified'}</h2>
                            {can(['edit_job_source', 'delete_job_source']) && (
                                <JobSourceActions edit={() => setSource(row)} id={row?.id} refetch={mutate} />
                            )}
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No job sources found yet!</span>
                )}
            </div>
            {can('create_job_source') && show && <JobSourceForm refetch={mutate} />}
        </div>
    )
}

export default memo(JobSources)
