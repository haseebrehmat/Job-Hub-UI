import { memo, useReducer } from 'react'
import useSWR from 'swr'
import { Link } from 'react-router-dom'

import { Loading, Searchbox, EmptyTable, Button, Paginated } from '@components'

import { CandidateForm, CandidateActions, CandidateDesignationAndSkills } from '@modules/leadManagement/components'
import { fetchCandidates } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'
import { CANDIDATE_HEADS, CANDIDATE_INITIAL_STATE } from '@constants/leadManagement'

import { CreateIcon, DesignationIcon } from '@icons'

const Candidates = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), CANDIDATE_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/candidate_management/candidate/?page=${vals.page}&search=${vals.query}`,
        fetchCandidates
    )
    const handleClick = values => dispatch({ show: !vals.show, candidate: values })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                {can('create_user') && (
                    <Button label='Create Candidate' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                )}
                {can('create_user') && (
                    <Link to='/designations'>
                        <Button label='Designations' icon={DesignationIcon} />
                    </Link>
                )}
                {can('create_user') && (
                    <Link to='/exposed-candidates'>
                        <Button label='Exposed Candidates' icon={DesignationIcon} />
                    </Link>
                )}
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
                                <CandidateDesignationAndSkills skills={row?.skills} designation={row?.designation} />
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_user', 'delete_user']) && (
                                        <CandidateActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No candidates found yet!' />
                    )}
                </tbody>
            </table>
            {data?.candidates?.length > 24 && (
                <div className='w-full'>
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={page => dispatch({ page })}
                        page={vals.page}
                    />
                </div>
            )}
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

export default memo(Candidates)
