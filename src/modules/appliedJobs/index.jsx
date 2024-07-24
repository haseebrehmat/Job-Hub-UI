import { memo, useState, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Badge } from '@components'

import { fetchAppliedJobs } from '@modules/appliedJobs/api'
import { EmptyTable, Searchbox, TableNavigate, AppliedJobActions, Filters } from '@modules/appliedJobs/components'

import { tableHeads, jobStatus, APPLIED_JOBS_FILTERS_INITIAL_VALS } from '@constants/appliedJobs'
import { formatDate, timeSince } from '@utils/helpers'

const AppliedJobs = memo(({ userId = '' }) => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), APPLIED_JOBS_FILTERS_INITIAL_VALS)
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState()

    const { data, error, isLoading } = useSWR([page, query, userId], () => fetchAppliedJobs(page, query, userId))

    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    if (isLoading) return <Loading />
    return (
        <div>
            <div className='max-w-full overflow-x-auto hide_scrollbar shadow-md sm:rounded-lg mb-14'>
                <Searchbox
                    query={query}
                    setQuery={setQuery}
                    setPage={setPage}
                    toggle={() => dispatch({ filter: !vals.filter })}
                    filter={vals.filter}
                    last12HoursJobsCount={data?.last_12_hours_count ?? 0}
                />
                {vals.filter && <Filters filtered={vals} dispatch={dispatch} agent={userId === ''} />}
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
                                        <span className='font-bold'>{timeSince(job?.applied_date)}</span>
                                        <div>{formatDate(job?.applied_date)}</div>
                                    </td>
                                    <td className='px-3 py-4'>{job?.company_name}</td>
                                    <td className='px-3 py-4 cursor-pointer underline'>
                                        <a href={job?.job_source_url} target='_blank' rel='noopener noreferrer'>
                                            {job?.job_title}
                                        </a>
                                    </td>
                                    <td className='px-3 py-4'>{job?.job_source}</td>
                                    <td className='px-3 py-4'>
                                        <Badge label={job?.tech_keywords} />
                                    </td>
                                    <td className='px-3 py-4'>{job?.job_type}</td>
                                    <td className='w-28 py-4'>
                                        <Badge label={jobStatus[job?.status]} type='success' />
                                    </td>
                                    <td className='px-3 py-4 capitalize'>{userId ? 'ME' : job?.applied_by_name}</td>
                                    <td className='px-3 py-4 font-extrabold'>{job?.pseudo?.name ?? 'N/A'}</td>
                                    <td className='px-3 py-4 font-semibold'>{job?.vertical?.name ?? 'N/A'}</td>
                                    <td className='px-3 py-4'>
                                        <AppliedJobActions job={job} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable />
                        )}
                    </tbody>
                </table>
                {data?.jobs?.length > 0 && !error && (
                    <TableNavigate data={data} page={page} handleClick={handleClick} />
                )}
            </div>
        </div>
    )
})

export default AppliedJobs
