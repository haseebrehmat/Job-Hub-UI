import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading } from '@components'

import { fetchAppliedJobs } from '@modules/appliedJobs/api'
import { EmptyTable, Searchbox, TableNavigate } from '@modules/appliedJobs/components'

import { tableHeads } from '@constants/appliedJobs'

const AppliedJobs = memo(() => {
    const [page, setPage] = useState(1)
    const { data, error, isLoading } = useSWR(page, fetchAppliedJobs)

    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    return isLoading || error ? (
        <Loading />
    ) : (
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <Searchbox />
            <table className='table-auto w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
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
                            <tr className='bg-white border-b  hover:bg-gray-50' key={index}>
                                <th className='px-6 py-4'>{job.job_posted_date}</th>
                                <td className='px-6 py-4'>{job.company_name}</td>
                                <td className='px-6 py-4'>{job.job_title}</td>
                                <td className='px-6 py-4'>{job.job_source}</td>
                                <td className='px-6 py-4'>Me</td>
                                <td className='px-6 py-4'>{job.job_status}</td>
                                <td className='px-6 py-4'>BD</td>
                                <td className='px-6 py-4'>{job.tech_keywords}</td>
                                <td className='px-6 py-4'>$100</td>
                                <td className='px-6 py-4'>Notes</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable />
                    )}
                </tbody>
            </table>
            <TableNavigate data={data} handleClick={handleClick} />
        </div>
    )
})

export default AppliedJobs
