import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { Button } from '@components'

import { timeSince, can } from '@utils/helpers'

import { UptoIcon } from '@icons'

const JobCardFooter = ({ job = null }) => {
    const [blocked] = useJobPortalV2Store(state => [state.blocked])

    return job ? (
        <div className='flex items-center justify-between mt-2 mr-1.5'>
            <span className='text-slate-500 font-semibold -skew-x-3 pl-2'>{timeSince(job?.job_posted_date)}</span>
            {can('apply_job') &&
                (job?.total_vertical > 0 && !blocked ? (
                    <div className='flex items-center gap-2'>
                        <span className='text-sm border rounded px-2 p-0.5 text-[#338d8c] border-[#55bf84] font-mono'>
                            {job?.total_vertical} / <strong>{job?.remaining_vertical}</strong>
                        </span>
                        <div className='flex items-center gap-2 px-2 py-1 border text-[#338d8c] border-[#4ab9a7] rounded-full hover:border-opacity-50'>
                            <Button
                                label='Apply Now'
                                fit
                                classes='!rounded-full !border-0 !p-0 hover:!bg-white hover:!text-[#338d8c]'
                            />
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
