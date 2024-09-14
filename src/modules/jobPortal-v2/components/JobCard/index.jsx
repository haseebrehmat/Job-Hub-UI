import { memo } from 'react'

import { JobCardFooter, JobCardHead, JobSourceAndType, TechKeywords } from '@modules/jobPortal-v2/components'

const JobCard = ({ job = null }) =>
    job ? (
        <div
            className={`rounded-lg border  border-slate-300 ${
                job?.block ? 'bg-[#d9d5d5] bg-opacity-40 shadow-sm' : 'bg-slate-50'
            }  overflow-hidden hover:bg-white hover:border-[#338d8c] p-3 hover:-skew-x-1`}
        >
            <JobCardHead job={job} />
            <div className='pl-1.5'>
                <div className='grid grid-cols-[minmax(0,1fr),minmax(0,1fr)] gap-y-2 gap-x-4 pt-3.5'>
                    {job?.company_name && (
                        <span className='flex items-center gap-2 border border-neutral-400 px-2 py-1 rounded-md text-[14px]'>
                            <span className='text-neutral-500'>Company:</span>
                            <span className='text-neutral-700 capitalize tracking-wider'>{job?.company_name}</span>
                        </span>
                    )}
                    <JobSourceAndType job={job} />
                    {job?.salary_max && (
                        <span className='flex items-center gap-2border border-neutral-400 px-2 py-1 rounded-md text-[14px]'>
                            <span className='text-neutral-500'>Max Salary:</span>
                            <span className='text-neutral-700 capitalize font-mono'>
                                {job?.salary_max} / {job?.salary_format}
                            </span>
                        </span>
                    )}
                    <TechKeywords keywords={job?.tech_keywords} />
                </div>
                <JobCardFooter job={job} />
            </div>
        </div>
    ) : null

export default memo(JobCard)
