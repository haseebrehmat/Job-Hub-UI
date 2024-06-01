import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Searchbox, EmptyTable, Loading, Badge } from '@components'

import { fetchCandidates } from '@modules/leadManagement/api'

import { CANDIDATE_SELECT_STATE } from '@constants/leadManagement'

const CandidateSelect = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), CANDIDATE_SELECT_STATE)
    const { data, isLoading } = useSWR(`/api/candidate_management/candidate/?search=${vals.query}`, fetchCandidates)

    const handleChange = ({ target: { value } }) => dispatch({ candidate_id: value })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto'>
            <div className='flex items-center py-3 gap-2 flex-wrap'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
            </div>
            {data && data?.candidates?.length > 0 ? (
                data?.candidates?.map((row, index) => (
                    <div className='bg-white border-y flex py-3 items-start px-2' key={index}>
                        <div className='flex items-center gap-2 w-1/3'>
                            <input
                                type='radio'
                                checked={vals?.candidate_id === row.id.toString()}
                                value={row.id.toString()}
                                className='__checkbox'
                                onChange={handleChange}
                            />
                            <span className='capitalize'>{row?.name ?? 'N/A'}</span>
                        </div>
                        <span className='uppercase w-28'>
                            <Badge label={row?.designation ?? 'N/A'} classes='text-xs' />
                        </span>
                        <div className='flex flex-wrap gap-1 w-2/3'>
                            {row?.skills?.map(s => (
                                <Badge label={s} classes='text-xs border border-green-300' type='success' key={s} />
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <EmptyTable cols={6} msg='No candidates found yet!' />
            )}
        </div>
    )
}

export default memo(CandidateSelect)
