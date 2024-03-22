import { React, useState } from 'react'
import useSWR from 'swr'
import { Loading, Searchbox, EmptyTable, Button } from '@components'

import { JobForm, ManualJobsActions } from '@modules/jobsUploader/components'
import { fetchManualJobs } from '@modules/jobsUploader/api'

import { manualJobsHeads } from '@constants/jobPortal'
import { CreateIcon } from '@icons'

const JobsPoster = () => {
    const [query, setQuery] = useState('')
    const [show, setShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR(`api/job_portal/manual_jobs/`, fetchManualJobs)

    const handleClick = () => setShow(!show)

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                <Button
                    label='Create a Job'
                    fit
                    icon={CreateIcon}
                    onClick={() => handleClick({ name: '', status: true })}
                />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {manualJobsHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.jobs?.length > 0 && !error ? (
                        data.jobs.map(job => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={job?.id}>
                                <td className='p-5'>{job?.job_title}</td>
                                <td className='p-5'>{job?.company_name}</td>
                                <td className='p-5 capitalize'>
                                    <a
                                        className='underline focus:text-black focus:text-lg'
                                        target='_blank'
                                        rel='noreferrer'
                                        href={job?.job_source_url}
                                    >
                                        {job?.job_source}
                                    </a>
                                </td>
                                <td className='p-5'>{job?.tech_keywords}</td>
                                <td className='p-5'>{job?.job_type}</td>
                                <td className='p-5'>{job?.job_posted_date}</td>
                                <td className='px-3 py-6 float-right'>
                                    <ManualJobsActions id={job?.id} edit={() => handleClick(job?.id)} mutate={mutate} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No companies found yet!' />
                    )}
                </tbody>
            </table>
            <JobForm show={show} setShow={setShow} />
        </div>
    )
}

export default JobsPoster
