import { memo, useState, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Tooltip, Button } from '@components'

import { fetchTeamAppliedJobs } from '@modules/teamAppliedJobs/api'
import { JobSourceAnalytics, Filters, EmptyTable, TableNavigate } from '@modules/teamAppliedJobs/components'

import { formatDate, timeSince } from '@utils/helpers'
import { tableHeads, TEAM_APPLIED_JOBS_INITIAL_VALS } from '@constants/teamAppliedJobs'

import { DownloadIcon, CandidateFilterIcon } from '@icons'

const TeamAppliedJobs = memo(() => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), TEAM_APPLIED_JOBS_INITIAL_VALS)
    const [page, setPage] = useState(1)
    const { data, error, isLoading } = useSWR([page, vals.bd?.value], () =>
        fetchTeamAppliedJobs(page, vals.bd?.value === 'all' ? '' : vals.bd?.value)
    )
    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))

    return isLoading || error ? (
        <Loading />
    ) : (
        <div className='max-w-full overflow-x-auto shadow-md sm:rounded-lg mb-14 px-2'>
            <JobSourceAnalytics
                job_sources={data.job_source_analytics}
                job_types={data.job_type_analytics}
                total={data.total}
                members={data?.team_members}
            />
            <div className='flex items-center justify-between p-3'>
                <p className='pl-2 text-[#006366] font-bold text-lg'>
                    Applied Jobs: {data.last_12_hours_count} (Last 12 hours)
                </p>
                <Button
                    icon={CandidateFilterIcon}
                    label='Filters'
                    onClick={() => dispatch({ filter: !vals.filter })}
                    fit
                    fill={vals.filter}
                />
            </div>
            {vals.filter && <Filters filtered={vals} dispatch={dispatch} data={data} />}
            <table className='table-auto w-full text-sm text-left text-gray-500 mt-2'>
                <thead className='text-sm text-gray-700 uppercase bg-[#edfdfb] border'>
                    <tr>
                        {tableHeads.map(heading => (
                            <th scope='col' className='px-3 py-5 text-[#006366]' key={heading}>
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
                                    <span className='font-bold'>{timeSince(job?.applied_date)}</span>
                                    <div>{formatDate(job?.applied_date)}</div>
                                </td>
                                <td className='px-3 py-4'>{job?.company_name}</td>
                                <td className='px-3 py-4 w-96 '>
                                    <a className='underlin' target='_blank' rel='noreferrer' href={job?.job_source_url}>
                                        {job?.job_title}
                                    </a>
                                </td>
                                <td className='px-3 py-4'>{job?.job_source}</td>
                                <td className='px-3 py-4'>{job?.tech_keywords}</td>
                                <td className='px-3 py-4'>{job?.job_type}</td>
                                <td className='px-3 py-4'>{job?.applied_by_name || 'not-confirmed'}</td>
                                <td className='px-3 py-4 font-semibold'>{job?.vertical?.name ?? 'N/A'}</td>
                                <td className='px-3 py-4'>
                                    <div className='flex space-x-2'>
                                        {job?.cover_letter && (
                                            <a href={job?.cover_letter} download target='_blank' rel='noreferrer'>
                                                <Tooltip text='Download Cover Letter'>{DownloadIcon}</Tooltip>
                                            </a>
                                        )}
                                        {job?.resume && (
                                            <a href={job?.resume} download target='_blank' rel='noreferrer'>
                                                <Tooltip text='Download Resume'>{DownloadIcon}</Tooltip>
                                            </a>
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
            {data?.jobs?.length > 0 && <TableNavigate data={data} page={page} handleClick={handleClick} />}
        </div>
    )
})

export default TeamAppliedJobs
