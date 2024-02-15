import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Badge } from '@components'

import { fetchTeamAppliedJobs } from '@modules/jobs/api'
import { EmptyTable, Searchbox, TableNavigate } from '@modules/appliedJobs/components'

import { tableHeads, jobStatus } from '@constants/jobs'
import { formatDate, timeSince } from '@utils/helpers'
import toast from 'react-hot-toast'

const Jobs = memo(() => {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState()
    const { data, error, isLoading, mutate } = useSWR([page, query], () => fetchTeamAppliedJobs(page, query))
    const handleClick = type => setPage(prevPage => (type === 'next' ? prevPage + 1 : prevPage - 1))
    const jobsStatusTypes = Object.entries(jobStatus)
    const apiUrl = import.meta.env.VITE_SCRAPPER_API_URL

    const updateJobStatus = (id, stausValue) => {
        fetch(`${apiUrl}job_status/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: stausValue, job: data.jobs[id].id }),
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
                        jobs: data.jobs.map((item, key) => (key === id ? { ...item, job_status: stausValue } : item)),
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
        <div className='max-w-full overflow-x-auto shadow-md sm:rounded-lg'>
            <div className='flex items-center justify-between'>
                <p className='py-2 pl-4 text-[#006366] font-bold text-lg'>Applied Jobs</p>
                <Searchbox query={query} setQuery={setQuery} setPage={setPage} />
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
                                    <select
                                        name='job_status'
                                        className='block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg'
                                        value={job.job_status}
                                        onChange={e => updateJobStatus(index, e.target.value)}
                                    >
                                        {jobsStatusTypes.length > 0 &&
                                            jobsStatusTypes.map((status, key) => (
                                                <option value={status[0]} key={key}>
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

export default Jobs
