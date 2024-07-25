import { React, useState } from 'react'
import useSWR from 'swr'

import { Loading, EmptyTable, Button } from '@components'

import { CreateJobForm } from '@modules/jobsUploader/components'
import { fetchManualJobs } from '@modules/jobsUploader/api'

import { can, formatDate } from '@utils/helpers'
import { MANUAL_JOBS_HEADS } from '@constants/jobUploader'

import { CreateIcon } from '@icons'

const ManualJobs = () => {
    const [show, setShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR('api/job_portal/manual_jobs/', fetchManualJobs)

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center py-3 justify-end'>
                {can(['create_manual_job']) && (
                    <Button label='Create a Job' fit icon={CreateIcon} onClick={() => setShow(!show)} />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {MANUAL_JOBS_HEADS.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.jobs?.length > 0 && !error ? (
                        data.jobs.map(job => (
                            <tr
                                className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-slate-100'
                                key={job?.id}
                            >
                                <td className='p-3 w-32'>{formatDate(job?.job_posted_date)}</td>
                                <td className='p-3'>{job?.job_title}</td>
                                <td className='p-3'>{job?.company_name}</td>
                                <td className='p-3 capitalize'>
                                    <a
                                        className='underline focus:text-black focus:text-lg'
                                        target='_blank'
                                        rel='noreferrer'
                                        href={job?.job_source_url}
                                    >
                                        {job?.job_source}
                                    </a>
                                </td>
                                <td className='p-3'>{job?.tech_keywords}</td>
                                <td className='p-3'>{job?.job_type}</td>
                                <td className='p-3'>{job?.job_role || '--'}</td>
                                <td className='p-3'>{job?.salary_format || '--'}</td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No Jobs found yet!' />
                    )}
                </tbody>
            </table>
            {show && <CreateJobForm show={show} setShow={setShow} mutate={mutate} />}
        </div>
    )
}

export default ManualJobs
