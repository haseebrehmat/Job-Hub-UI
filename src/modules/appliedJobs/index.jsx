/* eslint-disable camelcase */
import { memo, useState } from 'react'
import useSWR from 'swr'

import { Input } from '@components'
import { fetchAppliedJobs } from '@modules/appliedJobs/api'

const AppliedJobs = memo(() => {
    const [page, setPage] = useState(1)
    const { data, error, isLoading } = useSWR(page, fetchAppliedJobs)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    return isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className='relative m-4 overflow-x-auto shadow-md sm:rounded-lg'>
            <div className='p-4 float-right'>
                <label htmlFor='table-search' className='sr-only'>
                    Search
                </label>
                <div className='relative'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                        <svg
                            className='w-5 h-5 text-gray-500 dark:text-gray-400'
                            aria-hidden='true'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                    <Input ph='Search for items' classes='block p-2 pl-10' />
                </div>
            </div>
            <table className='table-auto w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Created At
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Company Name
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Job Title
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Job Source
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Assign To
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Status
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Agent (BD)
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Tech Stack
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Job Budget
                        </th>
                        <th scope='col' className='px-3 py-4 text-[#006366]'>
                            Notes
                        </th>
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
                        <tr>
                            <td colSpan={10} className='text-center pt-4'>
                                No Applied Jobs found yet!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <nav className='flex items-center justify-between p-4' aria-label='Table navigation'>
                <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
                    Showing <span className='font-semibold text-gray-900 dark:text-white'>1-12</span> of{' '}
                    <span className='font-semibold text-gray-900 dark:text-white'>{data?.total}</span>
                </span>
                <ul className='inline-flex items-center -space-x-px'>
                    <li>
                        <button
                            disabled={!data?.prev}
                            className='block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'
                            onClick={() => handleClick('prev')}
                        >
                            <svg
                                className='w-5 h-5'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            disabled={!data?.next}
                            className='block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'
                            onClick={() => handleClick('next')}
                        >
                            <svg
                                className='w-5 h-5'
                                aria-hidden='true'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
})

export default AppliedJobs
