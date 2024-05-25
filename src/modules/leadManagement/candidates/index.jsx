import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Button, Paginated, Badge } from '@components'

import { CandidateForm, CandidateActions } from '@modules/leadManagement/components'
import { fetchUsers } from '@modules/userManagement/api'

import { can } from '@utils/helpers'
import { CANDIDATE_HEADS, CANDIDATE_INITIAL_STATE } from '@constants/leadManagement'

import { CreateIcon } from '@icons'

const Candidates = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), CANDIDATE_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `/api/auth/user/?page=${vals.page}&search=${vals.query}`,
        fetchUsers
    )
    const handleClick = values => dispatch({ show: !vals.show, user: values })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                {can('create_user') && (
                    <Button label='Create Candidate' fit icon={CreateIcon} onClick={() => handleClick(null)} />
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
                    {data?.users?.length > 0 && !error ? (
                        data?.users?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6 capitalize'>{row?.username}</td>
                                <td className='px-3 py-6'>{row?.email}</td>
                                <td className='px-3 py-6 italic'>+932233455980</td>
                                <td className='px-6 py-6 text-lg'>10</td>
                                <td className='px-6 py-6 text-lg'>45</td>
                                <td className='px-2 py-1'>
                                    <span className='flex items-center flex-wrap space-x-1.5 space-y-1.5'>
                                        <Badge
                                            label='python'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='python'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='python'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='python'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='python'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='python'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='python'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='ruby on rails'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='ruby on rails'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='ruby on rails'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                        <Badge
                                            label='ruby on rails'
                                            type='success'
                                            classes='text-xs border border-green-300'
                                        />
                                    </span>
                                </td>
                                <td className='px-3 py-6 font-bold'>
                                    <Badge label='SSE' />
                                </td>
                                <td className='px-3 py-6 float-right'>
                                    {can(['edit_user', 'delete_user']) && (
                                        <CandidateActions id={row?.id} edit={() => handleClick(row)} mutate={mutate} />
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No users found yet!' />
                    )}
                </tbody>
            </table>
            {data?.users?.length > 24 && (
                <div className='w-full'>
                    <Paginated
                        pages={data?.pages ?? Math.ceil(data.total / 25)}
                        setPage={page => dispatch({ page })}
                        page={vals.page}
                    />
                </div>
            )}
            {can('edit_user') && vals.show && (
                <CandidateForm show={vals.show} setShow={show => dispatch({ show })} mutate={mutate} user={vals.user} />
            )}
        </div>
    )
}

export default memo(Candidates)
