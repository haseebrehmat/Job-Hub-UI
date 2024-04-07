import { memo, useState } from 'react'
import useSWR from 'swr'

import { EmptyTable, Loading, Paginated } from '@components'

import { fetchJobLogs } from '@modules/scrapper/api'

import { formatDate } from '@utils/helpers'
import { LOGS_HEADS } from '@constants/scrapper'

const Logs = () => {
    const [page, setPage] = useState(1)
    const [show, setShow] = useState(false)

    const { data, isLoading, error } = useSWR('/api/job_scraper/logs/', fetchJobLogs)

    if (isLoading) return <Loading />

    return (
        <div className='max-w-full mb-14'>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {LOGS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {data?.logs?.results?.length > 0 && !error ? (
                        data?.logs?.map((row, idx) => (
                            <tr className='border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{row?.job_source}</td>
                                <td className='px-3 py-6'>{row?.total_jobs}</td>
                                <td className='px-3 py-6'>{formatDate(row?.created_at)}</td>
                                <td className='px-3 py-6'>{formatDate(row?.updated_at)}</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No Logs found yet!' />
                    )}
                </tbody>
            </table>
            <Paginated
                page={page}
                setPage={pageNumber => {
                    setPage({ page: pageNumber })
                }}
                pages={12}
            />
        </div>
    )
}

export default memo(Logs)
