import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge } from '@components'

import { fetchAppliedJobs } from '@modules/appliedJobs/api'
import { EmptyTable, Searchbox, TableNavigate } from '@modules/appliedJobs/components'

import { tableHeads, jobStatus } from '@constants/appliedJobs'
import { formatDate, timeSince } from '@utils/helpers'

const AppliedJobs = memo(({ userId = '' }) => {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState()
    const { data, error, isLoading } = useSWR([page, query, userId], () => fetchAppliedJobs(page, query, userId))

    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))
    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto shadow-md sm:rounded-lg mb-14'>
            <Searchbox query={query} setQuery={setQuery} setPage={setPage} />
            <table className='table-auto w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-[#edfdfb] border'>
                    <tr>
                        {tableHeads.map(heading => (
                            <th scope='col' className='px-3 py-4 text-[#006366]' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.jobs?.length > 0 && !error ? (
                        data.jobs.map((job, index) => (
                            <tr className='bg-white border border-slate-300 hover:bg-gray-100' key={index}>
                                <td className='px-3 py-4'>
                                    <span className='font-bold'>{timeSince(job.applied_date)}</span>
                                    <div>{formatDate(job.applied_date)}</div>
                                </td>
                                <td className='px-3 py-4'>{job.company_name}</td>
                                <td className='px-3 py-4 cursor-pointer underline'>
                                    <a
                                        href={job.job_source_url}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        data-tooltip-target='tooltip-default'
                                    >
                                        {job.job_title}
                                    </a>
                                    <div
                                        id='tooltip-default'
                                        role='tooltip'
                                        className='absolute z-10 invisible inline-block px-3 py-2 text-xs font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip'
                                    >
                                        {job.job_source_url}
                                        <div className='tooltip-arrow' data-popper-arrow />
                                    </div>
                                </td>
                                <td className='px-3 py-4'>{job.job_source}</td>
                                <td className='w-28 py-4'>
                                    <Badge label={jobStatus[job.job_status]} type='success' />
                                </td>
                                <td className='px-3 py-4'>BD</td>
                                <td className='px-3 py-4'>
                                    <Badge label={job.tech_keywords} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable />
                    )}
                </tbody>
            </table>
            {!error && <TableNavigate data={data} page={page} handleClick={handleClick} />}
        </div>
    )
})

export default AppliedJobs
