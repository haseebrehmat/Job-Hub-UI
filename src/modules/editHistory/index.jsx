import { memo, useMemo, useState } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import useSWR from 'swr'

import { Input, EmptyTable, Loading } from '@components'

import { fetchHistory } from '@modules/editHistory/api'
import { ChangesLog, HistoryPagination } from '@modules/editHistory/components'

import { can, formatDate, timeSince } from '@utils/helpers'
import { EDIT_HISTORY_HEADS, HISTORY_TYPES } from '@constants/editHistory'

import { BackToIcon } from '@icons'

const EditHistory = () => {
    const { rowId } = useParams()
    const { state } = useLocation()
    const [page, setPage] = useState(1)
    const { data, isLoading, error } = useSWR(
        `/api/job_portal/detect_changes/?instance_id=${rowId}&module=${state?.module}&page=${page}`,
        fetchHistory
    )
    const memoizedBackTo = useMemo(
        () => (
            <Link to={state?.backToUrl || '/profile'} className='text-[#048C8C] flex items-center gap-2 md:pt-3'>
                {BackToIcon} Back to {state?.backTo || 'Profile'}
            </Link>
        ),
        [state]
    )
    if (isLoading) return <Loading />
    return (
        <div className='flex flex-col gap-2 px-4'>
            {can(HISTORY_TYPES[state?.module]?.perms) ? (
                <>
                    <div className='flex justify-between items-center'>
                        <Input ph='Search the history' classes='mb-2 !w-full' />
                        {memoizedBackTo}
                    </div>
                    <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                        <thead className='text-xs uppercase border border-[#048C8C]'>
                            <tr>
                                {EDIT_HISTORY_HEADS.map(heading => (
                                    <th scope='col' className='px-3 py-4' key={heading}>
                                        {heading?.lg ? (
                                            <>
                                                {heading?.lg}
                                                <span className='!text-xs !font-normal'>{heading?.sm}</span>
                                            </>
                                        ) : (
                                            heading
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data?.results?.length > 0 && !error ? (
                                data?.results?.map((row, idx) => (
                                    <tr
                                        className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'
                                        key={row.id}
                                    >
                                        <td className='px-3 py-4 w-10'>{idx + 1}</td>
                                        <td className='w-1/6 p-3'>
                                            {timeSince(row?.date)}
                                            <span className='block text-[13px] ml-1'>
                                                {formatDate(row?.created_at)}
                                            </span>
                                        </td>
                                        <td className='p-3'>{row?.user?.username}</td>
                                        <td className='w-8/12 p-2'>
                                            <ChangesLog data={row?.changes} />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <EmptyTable cols={4} msg='No history found yet' />
                            )}
                        </tbody>
                    </table>
                    <HistoryPagination data={data} page={page} set={setPage} />
                </>
            ) : (
                <>
                    {memoizedBackTo}
                    <div className='flex items-center justify-center min-h-[54vh]'>
                        <p className='text-2xl text-neutral-400 border border-neutral-400 px-2 py-12 -skew-x-12'>
                            {HISTORY_TYPES[state?.module]?.msg || 'You are Unauthorized'}
                        </p>
                    </div>
                </>
            )}
        </div>
    )
}

export default memo(EditHistory)
