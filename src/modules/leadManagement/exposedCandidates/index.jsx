import { memo, useReducer } from 'react'
import useSWR from 'swr'
import { Link } from 'react-router-dom'

import { Loading, Searchbox, EmptyTable, Button, Badge } from '@components'

import { CandidateForm } from '@modules/leadManagement/components'
import { fetchCandidates } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'
import { CANDIDATE_HEADS, CANDIDATE_INITIAL_STATE } from '@constants/leadManagement'

import { BackToIcon } from '@icons'

const ExposedCandidates = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), CANDIDATE_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/candidate/?page=${vals.page}&search=${vals.query}`,
        fetchCandidates
    )

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                <Link to='/candidates'>
                    <Button label='Back to Candidates' icon={BackToIcon} />
                </Link>
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {CANDIDATE_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.candidates?.length > 0 && !error ? (
                        data?.candidates?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6 capitalize'>{row?.name ?? 'N/A'}</td>
                                <td className='px-3 py-6'>{row?.email ?? 'N/A'}</td>
                                <td className='px-3 py-6 italic'>{row?.phone ?? 'N/A'}</td>
                                <td className='px-6 py-6'>{row?.experience ?? 'N/A'}</td>
                                <td className='px-6 py-6'>{row?.leads ?? 'N/A'}</td>
                                <td className='px-2'>abc</td>
                                <td className='px-2 py-1'>
                                    {row?.designation ? <Badge label={row?.designation?.title} /> : 'N/A'}
                                </td>
                                <td className='px-3 py-6 float-right'>actions</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No candidates found yet!' />
                    )}
                </tbody>
            </table>
            {can('edit_user') && vals.show && (
                <CandidateForm
                    show={vals.show}
                    setShow={show => dispatch({ show })}
                    mutate={mutate}
                    candidate={vals.candidate}
                />
            )}
        </div>
    )
}

export default memo(ExposedCandidates)
