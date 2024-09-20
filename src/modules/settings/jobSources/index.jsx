import { memo } from 'react'
import useSWR from 'swr'

import { useDynamicJobSourcesStore } from '@/stores'

import { Loading, Button, Searchbox, Paginated } from '@components'

import { JobSourceActions, JobSourceForm } from '@modules/settings/components'
import { fetchRegions } from '@modules/settings/api'

import { can } from '@utils/helpers'

import { CreateIcon } from '@icons'

const JobSources = () => {
    const [show, page, query, setSource, setPage, setQuery, setMutator] = useDynamicJobSourcesStore(state => [
        state?.show,
        state?.page,
        state?.query,
        state?.setSource,
        state?.setPage,
        state?.setQuery,
        state?.setMutator,
    ])

    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/regions/?search=${query}&page=${page}`,
        fetchRegions,
        {
            onSuccess: () => setMutator(mutate),
        }
    )

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center pt-3 pb-6 justify-between'>
                <div className='flex space-x-3 items-center'>
                    <Searchbox query={query} setQuery={input => setQuery(input)} />
                </div>
                {can('create_region') && (
                    <Button label='Add Job Source' fit icon={CreateIcon} onClick={() => setSource(null)} />
                )}
            </div>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
                {data?.regions?.length > 0 && !error ? (
                    data?.regions?.map((row, idx) => (
                        <div
                            className='bg-white border border-[#048C8C] rounded-md p-4 relative hover:bg-slate-100'
                            key={idx}
                        >
                            <h2 className='text-lg'>{row?.region ?? 'Not Specified'}</h2>
                            <h2 className='text-sm pl-1'>{row?.region ?? 'Not Specified'}</h2>
                            {can(['edit_region', 'delete_region']) && (
                                <JobSourceActions edit={() => setSource(row)} id={row?.id} />
                            )}
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No job sources found yet!</span>
                )}
            </div>
            {data?.pages > 1 && (
                <div className='w-full'>
                    <Paginated pages={data?.pages} setPage={pagee => setPage(pagee)} page={page} />
                </div>
            )}
            {can('create_region') && show && <JobSourceForm />}
        </div>
    )
}

export default memo(JobSources)
