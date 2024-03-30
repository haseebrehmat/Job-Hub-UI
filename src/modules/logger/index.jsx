import { memo } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading } from '@components'

import { fetchJobSourceLinks } from '@modules/scrapper/api'

import { can, formatDate2 } from '@utils/helpers'
import { LOGGER_HEADS } from '@constants/logger'

const Logger = () => {
    const { data, isLoading, error } = useSWR('/api/job_scraper/job_source_link/', fetchJobSourceLinks)

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <table className='table-auto w-full text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {LOGGER_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.links?.length > 0 && !error ? (
                        data?.links?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-20 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-3.5'>{idx + 1}</td>
                                <td className='px-3 py-3.5'>title..</td>
                                <td className='px-3 py-3.5'>type..</td>
                                <td className='px-3 py-3.5'>user..</td>
                                <td className='px-3 py-3.5'>{formatDate2(row?.created_at)}</td>
                                <td className='px-3 py-3.5 float-right'>{can('show_log_details') && 'see'}</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No logs found yet!' />
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(Logger)
