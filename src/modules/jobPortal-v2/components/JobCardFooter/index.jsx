import { memo } from 'react'
import { Link } from 'react-router-dom'

import { useJobPortalV2Store } from '@/stores'

import { timeSince, can, formatDate } from '@utils/helpers'

import { UptoIcon } from '@icons'

const JobCardFooter = ({ job = null }) => {
    const [blocked] = useJobPortalV2Store(state => [state.blocked])

    return job ? (
        <div className='flex items-center justify-between mt-2 mr-1.5'>
            <span className='text-slate-500 font-semibold -skew-x-3 pl-2 inline-flex items-center'>
                {timeSince(job?.job_posted_date)}
                <span className='text-sm pl-2 font-normal'>({formatDate(job?.job_posted_date)})</span>
            </span>
            {can('apply_job') &&
                (job?.total_vertical > 0 && !blocked ? (
                    <div className='flex items-center gap-2'>
                        <span className='text-sm border rounded px-2 p-0.5 text-[#338d8c] border-[#55bf84] font-mono'>
                            {job?.remaining_vertical} / <strong>{job?.total_vertical}</strong>
                        </span>
                        <div className='flex items-center gap-2 px-2 py-1 border text-[#338d8c] border-[#4ab9a7] rounded-full hover:border-opacity-50'>
                            <Link to={`/apply-for-job/${job?.id}`} className='text-sm w-fit !rounded-full !border-0'>
                                Apply Now
                            </Link>
                            <span>{UptoIcon}</span>
                        </div>
                    </div>
                ) : (
                    <small className='text-xs text-slate-500 border py-0.5 px-1.5 border-slate-500 rounded-full'>
                        {blocked ? 'blocked' : 'No vertical assigned'}
                    </small>
                ))}
        </div>
    ) : null
}

export default memo(JobCardFooter)
