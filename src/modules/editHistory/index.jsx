import { memo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useSWR from 'swr'

import { Input, EmptyTable, Loading } from '@components'

import { fetchHistory } from '@modules/editHistory/api'
import { ChangesLog } from '@modules/editHistory/components'

import { formatDate, timeSince } from '@utils/helpers'
import { EDIT_HISTORY_HEADS } from '@constants/editHistory'

const EditHistory = () => {
    const { rowId } = useParams()
    const { state } = useLocation()
    const { data, isLoading, error } = useSWR(
        `/api/lead_managament/leads/?id=${rowId}&module=${state?.module}`,
        fetchHistory
    )

    if (isLoading) return <Loading />
    return (
        <div className='flex flex-col gap-2 px-4'>
            <Input ph='Search the history' classes='!w-1/4 mb-2 float-right' />
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {EDIT_HISTORY_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading?.lg ? (
                                    <>
                                        {heading?.lg} <span className='!text-xs !font-normal'>{heading?.sm}</span>
                                    </>
                                ) : (
                                    heading
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 && !error ? (
                        data?.map((row, idx) => (
                            <tr
                                className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'
                                key={row.id}
                            >
                                <td className='px-3 py-4 w-10'>{idx + 1}</td>
                                <td className='w-1/6 p-3'>
                                    {timeSince(row?.date)}
                                    <span className='block text-[13px] ml-1'>{formatDate(row?.date)}</span>
                                </td>
                                <td className='p-3'>{row?.user?.username}</td>
                                <td className='w-8/12 p-2'>
                                    <ChangesLog />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={4} msg='No history found yet' />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(EditHistory)
