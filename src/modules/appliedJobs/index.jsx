import { memo, useState, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Badge, Tooltip } from '@components'

import { fetchAppliedJobs } from '@modules/appliedJobs/api'
import { ConvertToLeadForm, EmptyTable, Searchbox, TableNavigate } from '@modules/appliedJobs/components'

import { tableHeads, jobStatus } from '@constants/appliedJobs'
import { formatDate, timeSince } from '@utils/helpers'

import { DownloadIcon, DownloadIcon2, ConvertToLeadIcon } from '@icons'

const AppliedJobs = memo(({ userId = '' }) => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), { id: null, show: false })
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState()
    const { data, error, isLoading, mutate } = useSWR([page, query, userId], () =>
        fetchAppliedJobs(page, query, userId)
    )
    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))
    if (isLoading) return <Loading />
    return (
        <div>
            <div className='max-w-full overflow-x-auto hide_scrollbar shadow-md sm:rounded-lg mb-14'>
                <Searchbox
                    query={query}
                    setQuery={setQuery}
                    setPage={setPage}
                    last12HoursJobsCount={data?.last_12_hours_count ?? 0}
                />
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
                                    <td className='px-3 py-4'>BD</td>
                                    <td className='px-3 py-4 font-extrabold'>{job?.vertical?.pseudo ?? 'N/A'}</td>
                                    <td className='px-3 py-4 font-semibold'>{job?.vertical?.name ?? 'N/A'}</td>
                                    <td className='px-3 py-4'>
                                        <div className='flex space-x-2 items-center text-[#4f9d9b]'>
                                            {job?.cover_letter && (
                                                <a href={job?.cover_letter} download target='_blank' rel='noreferrer'>
                                                    <Tooltip text='Download Cover Letter'>{DownloadIcon}</Tooltip>
                                                </a>
                                            )}
                                            {job?.resume && (
                                                <a href={job?.resume} download target='_blank' rel='noreferrer'>
                                                    <Tooltip text='Download Resume'>{DownloadIcon2}</Tooltip>
                                                </a>
                                            )}
                                            {!job?.is_deleted && (
                                                <Tooltip text='Convert to Lead'>
                                                    <span
                                                        onClick={() =>
                                                            dispatch({ show: true, id: job?.applied_job_id })
                                                        }
                                                    >
                                                        {ConvertToLeadIcon}
                                                    </span>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <EmptyTable />
                        )}
                    </tbody>
                </table>
                {!error && <TableNavigate data={data} page={page} handleClick={handleClick} />}
                {vals.show && (
                    <ConvertToLeadForm
                        show={vals.show}
                        id={vals.id}
                        setShow={show => dispatch({ show })}
                        mutate={mutate}
                    />
                )}
            </div>
        </div>
    )
})

export default AppliedJobs
