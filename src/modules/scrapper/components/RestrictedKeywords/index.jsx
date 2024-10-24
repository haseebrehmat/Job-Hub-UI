import { memo } from 'react'
import useSWR from 'swr'

import { useResctrictedKeywordsStore } from '@/stores'

import { Loading, Button } from '@components'

import { JobSourceActions } from '@modules/settings/components'
import { RestrictedKeywordForm } from '@modules/scrapper/components'
import { fetchJobSources } from '@modules/settings/api'

import { can } from '@utils/helpers'
import { SWR_REVALIDATE } from '@constants/global'

import { CreateIcon } from '@icons'

const RestrictedKeywords = () => {
    const [show, setKeyword] = useResctrictedKeywordsStore(state => [state?.show, state.setKeyword])

    const { data, error, isLoading, mutate } = useSWR(`/api/job_scraper/job_source/`, fetchJobSources, SWR_REVALIDATE)

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto px-2 hide_scrollbar'>
            <div className='flex justify-end pb-2'>
                {can('create_job_source') && (
                    <Button label='Add Restricted Keyword' fit icon={CreateIcon} onClick={() => setKeyword(null)} />
                )}
            </div>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-5'>
                {data?.sources?.length > 0 && !error ? (
                    data?.sources?.map((row, idx) => (
                        <div
                            className='bg-white border border-[#048C8C] border-opacity-70 rounded-md p-4 relative hover:bg-slate-100'
                            key={idx}
                        >
                            <h2 className='text-lg'>{row?.name ?? 'N/A'}</h2>
                            {can(['edit_job_source', 'delete_job_source']) && (
                                <JobSourceActions edit={() => setKeyword(row)} id={row?.id} refetch={mutate} />
                            )}
                        </div>
                    ))
                ) : (
                    <span className='m-auto p-5 text-gray-500'>No job sources found yet!</span>
                )}
            </div>
            {can('create_job_source') && show && <RestrictedKeywordForm refetch={mutate} />}
        </div>
    )
}

export default memo(RestrictedKeywords)
