import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable } from '@components'

import { CandidateDesignationAndSkills, ExposedForm } from '@modules/leadManagement/components'
import { fetchCandidates } from '@modules/leadManagement/api'

import { EXPOSED_CANDIDATE_HEADS, EXPOSED_CANDIDATE_INITIAL_STATE } from '@constants/leadManagement'

const ExposedCandidates = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), EXPOSED_CANDIDATE_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/candidate/?search=${vals.query}`,
        fetchCandidates
    )

    const handleChange = ({ target: { value, checked } }) =>
        checked ? dispatch({ ids: [...vals.ids, value] }) : dispatch({ ids: vals.ids.filter(id => id !== value) })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center py-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                </div>
                {vals.ids.length > 0 && <ExposedForm candidates={vals.ids} mutate={mutate} dispatch={dispatch} />}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {EXPOSED_CANDIDATE_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.candidates?.length > 0 && !error ? (
                        data?.candidates?.map(row => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-1 py-6'>
                                    <input
                                        type='checkbox'
                                        value={row.id}
                                        checked={vals.ids[row.id]}
                                        className='w-5 h-5 accent-[#4f9d9b] cursor-pointer'
                                        onChange={handleChange}
                                    />
                                </td>
                                <td className='px-3 py-6'>
                                    <span className='capitalize'>{row?.name ?? 'N/A'}</span>
                                    {row?.email && <span className='text-xs ml-1 italic'>{`(${row?.email})`}</span>}
                                </td>
                                <CandidateDesignationAndSkills skills={row?.skills} designation={row?.designation} />
                                <td className='px-3 py-6'>no exposed</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No candidates found yet!' />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(ExposedCandidates)
