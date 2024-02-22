import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge } from '@components'

import { fetchCompanies } from '@modules/userManagement/api'
import { EmptyTable, Searchbox, TableNavigate } from '@modules/appliedJobs/components'

import { comapnyHeads, comapnyStatus } from '@constants/userManagement'
import { formatDate, timeSince } from '@utils/helpers'

const Companies = () => {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState()
    const { data, error, isLoading } = useSWR([page, query], fetchCompanies)

    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))
    if (isLoading) return <Loading />

    return (
        <div className='max-w-full overflow-x-auto mb-14'>
            <Searchbox query={query} setQuery={setQuery} setPage={setPage} />
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {comapnyHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
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
                                    <span className='font-bold'>{timeSince(job.job_posted_date)}</span>
                                    <div>{formatDate(job.job_posted_date)}</div>
                                </td>
                                <td className='px-3 py-4'>{job.company_name}</td>
                                <td className='px-3 py-4'>{job.job_title}</td>
                                <td className='px-3 py-4'>{job.job_source}</td>
                                <td className='px-3 py-4'>Me</td>
                                <td className='w-28 py-4'>
                                    <Badge label={comapnyStatus[job.job_status]} type='success' />
                                </td>
                                <td className='px-3 py-4'>BD</td>
                                <td className='px-3 py-4'>
                                    <Badge label={job.tech_keywords} />
                                </td>
                                <td className='px-3 py-4'>$100</td>
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
}

export default memo(Companies)
