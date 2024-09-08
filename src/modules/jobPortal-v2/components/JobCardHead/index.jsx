import { memo } from 'react'

import { useVisitedJobsStore } from '@/stores'

import { isset } from '@utils/helpers'

import { JobActions } from '@modules/jobPortal-v2/components'

import { RegionIcon, DoubleCheckIcon } from '@icons'

const JobCardHead = ({ job = null }) => {
    const [inVisitedJobs] = useVisitedJobsStore(state => [state.inVisitedJobs])

    return (
        job && (
            <div className='flex flex-col lg:flex-row items-start justify-between'>
                <div className='flex gap-3 items-start'>
                    <span className='bg-[#338d8c] h-14 w-14 rounded-lg text-white uppercase flex items-center justify-center text-xl'>
                        {job?.job_title?.substring(0, 1)}
                    </span>
                    <div className='flex flex-col text-gray-600 gap-y-0.5'>
                        <span className='text-lg capitalize font-semibold flex-wrap'>{job?.job_title}</span>
                        <span className='text-sm capitalize italic inline-flex items-center gap-1'>
                            {isset(job?.address) ? (
                                <>
                                    {RegionIcon} {job?.address}
                                </>
                            ) : (
                                'No Location'
                            )}
                        </span>
                    </div>
                </div>
                <div className='flex items-end text-[#338d8c] p-2 lg:p-0'>
                    {inVisitedJobs(job?.id) ? (
                        <span className='inline-flex gap-1 items-center text-sm'>{DoubleCheckIcon} Visited</span>
                    ) : null}
                    <JobActions job={job} />
                </div>
            </div>
        )
    )
}
export default memo(JobCardHead)
