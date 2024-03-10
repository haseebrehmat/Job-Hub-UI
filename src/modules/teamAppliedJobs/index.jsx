import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading } from '@components'

import { fetchTeamAppliedJobs } from '@modules/teamAppliedJobs/api'
import { EmptyTable, TableNavigate } from '@modules/appliedJobs/components'

import { tableHeads, jobStatus } from '@constants/teamAppliedJobs'
import { checkToken, formatDate, timeSince } from '@utils/helpers'
import toast from 'react-hot-toast'
import { baseURL } from '@utils/http'

const TeamAppliedJobs = memo(() => {
    const apiUrl = baseURL
    const [page, setPage] = useState(1)
    const [bd, setBD] = useState('all')
    const { data, error, isLoading, mutate } = useSWR([page, bd], () =>
        fetchTeamAppliedJobs(page, bd === 'all' ? '' : bd)
    )
    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))
    const jobsStatusTypes = Object.entries(jobStatus)

    const handleBdChange = e => {
        setBD(e.target.value)
    }
    const updateJobStatus = (id, stausValue) => {
        checkToken()
        fetch(`${apiUrl}api/job_portal/job_status/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token').slice(1, -1)}`,
            },
            body: JSON.stringify({ status: stausValue, job: data?.jobs[id].id }),
        })
            .then(resp => {
                if (!resp.ok) {
                    throw Error(resp)
                }
                return resp.json()
            })
            .then(resp => {
                mutate(
                    {
                        ...data,
                        jobs: data?.jobs.map((item, key) => (key === id ? { ...item, status: stausValue } : item)),
                    },
                    false
                )
                toast.success('Job status updated successfully!')
            })
            .catch(error => {
                toast.error('Server error!')
            })
    }


    return isLoading || error ? (
        <Loading />
    ) : (
        <div className='max-w-full overflow-x-auto shadow-md sm:rounded-lg mb-14'>
            <div className='flex items-center justify-between'>
                <p className='py-2 pl-4 text-[#006366] font-bold text-lg'>Team Applied Jobs</p>
                <select
                    className='block py-2 px-4 text-sm text-gray-900 border border-gray-300 rounded-lg'
                    value={bd}
                    onChange={handleBdChange}
                >
                    <option value='all'>All</option>
                    {data?.team_members?.length > 0 &&
                        data.team_members.map((item, key) => (
                            <option value={item.id} key={key}>
                                {item.username}
                            </option>
                        ))}
                </select>
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
                                    <span className='font-bold'>{timeSince(job?.applied_date)}</span>
                                    <div>{formatDate(job?.applied_date)}</div>
                                </td>
                                <td className='px-3 py-4'>{job?.company_name}</td>
                                <td className='px-3 py-4'>{job?.job_title}</td>
                                <td className='px-3 py-4'>
                                    <a className='underlin' target='_blank' rel='noreferrer' href={job?.job_source_url}>
                                        {job?.job_source}
                                    </a>
                                </td>
                                <td className='px-3 py-4'>{job?.applied_by_name || 'not-confirmed'}</td>
                                <td className='px-3 py-4'>
                                    <select
                                        name='job_status'
                                        className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg'
                                        value={job?.status}
                                        onChange={e => updateJobStatus(index, e.target.value)}
                                    >
                                        {jobsStatusTypes.length > 0 &&
                                            jobsStatusTypes.map((status, key) => (
                                                <option disabled={status[0] === '0'} value={status[0]} key={key}>
                                                    {status[1]}
                                                </option>
                                            ))}
                                    </select>
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
