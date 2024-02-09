import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge } from '@components'

import { fetchAppliedJobs } from '@modules/appliedJobs/api'
import { EmptyTable, Searchbox, TableNavigate } from '@modules/appliedJobs/components'

import { tableHeads, jobStatus } from '@constants/appliedJobs'
import { formatDate, timeSince } from '@utils/helpers'

const AppliedJobs = memo(() => {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState()
    const { data, error, isLoading } = useSWR([page, query], () => fetchAppliedJobs(page, query))

    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    return isLoading || error ? (
        <Loading />
    ) : (
        <div className='max-w-full overflow-x-auto shadow-md sm:rounded-lg'>
            <div className='flex items-center justify-between'>
                <p className='py-2 pl-4 text-[#006366] font-bold text-lg'>Applied Jobs</p>
                <Searchbox query={query} setQuery={setQuery} />
            </div>
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
                    {data?.jobs?.length > 0 ? (
                        data.jobs.map((job, index) => (
                            <tr className='bg-white border border-slate-300 hover:bg-gray-100' key={index}>
                                <td className='px-3 py-4'>
                                    <span className='font-bold'>{timeSince(job.job_posted_date)}</span>
                                    <div>{formatDate(job.job_posted_date)}</div>
                                </td>
                                <td className='px-3 py-4'>{job.company_name}</td>
                                <td className='px-3 py-4'>{job.job_title}</td>
                                <td className='px-3 py-4'>{job.job_source}</td>
                                <td className='px-3 py-4'>Me</td>
                                <td className='px-3 py-4'>
                                    <Badge label={jobStatus[job.job_status]} type='success' />
                                </td>
                                <td className='px-3 py-4'>BD</td>
                                <td className='px-3 py-4'>
                                    <Badge label={job.tech_keywords} />
                                </td>
                                <td className='px-3 py-4'>$100</td>
                                <td className='px-3 py-4 font-light'>
                                    The Best Toast in Town. Smoking hot React notifications.
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable />
                    )}
                </tbody>
            </table>
            {data?.jobs?.length > 0 && <TableNavigate data={data} page={page} handleClick={handleClick} />}
        </div>
    )
})

export default AppliedJobs
