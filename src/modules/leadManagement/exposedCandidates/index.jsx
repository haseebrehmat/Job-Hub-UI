import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable } from '@components'

import { CandidateDesignationAndSkills, ExposedForm, ExposedTo } from '@modules/leadManagement/components'
import { fetchCandidatesAndCompanies } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'
import { EXPOSED_CANDIDATE_HEADS, EXPOSED_CANDIDATE_INITIAL_STATE } from '@constants/leadManagement'

const ExposedCandidates = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), EXPOSED_CANDIDATE_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/candidate_exposed/?search=${vals.query}`,
        fetchCandidatesAndCompanies
    )
    const handleChange = ({ target: { value, checked } }) =>
        checked
            ? dispatch({ ids: [...vals.ids, Number(value)] })
            : dispatch({ ids: vals.ids.filter(id => id !== Number(value)) })

    const handleChangeAll = ({ target: { checked } }) =>
        checked
            ? dispatch({ ids: data?.candidates?.map(({ candidate }) => candidate?.id) ?? [] })
            : dispatch({ ids: [] })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <div className='flex items-center py-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                </div>
                {vals.ids.length > 0 && (
                    <ExposedForm
                        candidates={vals.ids}
                        companies={data?.companies}
                        selectedCompanies={vals.selectedCompanies}
                        mutate={mutate}
                        dispatch={dispatch}
                    />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {can('expose_to') && (
                            <th scope='col' className='px-3 py-4'>
                                <input
                                    type='checkbox'
                                    className='__checkbox'
                                    onChange={handleChangeAll}
                                    checked={vals.ids.length === data?.candidates?.length}
                                />
                            </th>
                        )}
                        {EXPOSED_CANDIDATE_HEADS.slice(1).map(heading => (
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
                                {can('expose_to') && (
                                    <td className='px-3 py-4'>
                                        <input
                                            type='checkbox'
                                            value={row?.candidate?.id}
                                            checked={vals.ids.includes(row?.candidate?.id)}
                                            className='__checkbox'
                                            onChange={handleChange}
                                        />
                                    </td>
                                )}
                                <td className='px-3 py-6'>
                                    <span className='capitalize'>{row?.candidate?.name ?? 'N/A'}</span>
                                    {row?.candidate?.email && (
                                        <span className='text-xs ml-1 italic'>{`(${row?.candidate?.email})`}</span>
                                    )}
                                </td>
                                <CandidateDesignationAndSkills
                                    skills={row?.candidate?.skills}
                                    designation={row?.candidate?.designation}
                                />
                                <ExposedTo companies={row?.exposed_to} mutate={mutate} />
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
