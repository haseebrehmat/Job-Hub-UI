import { memo } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Tooltip } from '@components'

import { fetchErrorLogs } from '@modules/logger/api'

import { can, formatDate } from '@utils/helpers'
import { ERROR_LOGGER_HEADS } from '@constants/logger'

const Logger = () => {
    const { data, isLoading, error } = useSWR('/api/error_logger/error_logs/', fetchErrorLogs)

    if (isLoading) return <Loading />

    return (
        <div className='min-h-screen'>
            <div className='max-w-full overflow-x-auto shadow-md sm:rounded-lg mb-14'>
                <table className='table-auto w-full table text-lg h-screen text-left mt-6 text-[#048C8C]'>
                    <thead className='text-xs uppercase border border-[#048C8C]'>
                        <tr>
                            {ERROR_LOGGER_HEADS.map(heading => (
                                <th scope='col' className='px-3 py-4' key={heading}>
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {data?.errors?.length > 0 && !error ? (
                            data?.errors?.map((row, idx) => (
                                <tr className='border-b border-[#006366] border-opacity-20 hover:bg-gray-100' key={idx}>
                                    <td className='px-3 py-3.5'>{row?.id}</td>
                                    <td className='px-3 py-3.5 cursor-pointer'>
                                        {row?.user && (
                                            <Tooltip text={`email: ${row?.user?.email}`} down>
                                                {row?.user?.username}
                                            </Tooltip>
                                        )}
                                    </td>
                                    <td className='px-3 py-3.5'>{row?.level}</td>
                                    <td className='px-3 py-3.5'>{row?.log_message}</td>
                                    <td className='px-3 py-3.5'>{row?.error_message}</td>
                                    <td className='px-3 py-3.5 cursor-pointer'>
                                        {row?.user && (
                                            <Tooltip text={`traceback: ${row?.traceback}`} down>
                                                {row?.error_line}
                                            </Tooltip>
                                        )}
                                    </td>
                                    <td className='px-3 py-3.5'>{row?.path}</td>
                                    <td className='px-3 py-3.5'>{row?.line_number}</td>
                                    <td className='px-3 py-3.5'>{row?.method}</td>
                                    <td className='px-3 py-3.5'>{row?.status_code}</td>
                                    <td className='px-3 py-3.5'>{formatDate(row?.time)}</td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable cols={6} msg='No logs found yet!' />
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default memo(Logger)
