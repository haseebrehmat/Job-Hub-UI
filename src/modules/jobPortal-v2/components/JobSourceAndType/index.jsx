import { memo } from 'react'

import { useVisitedJobsStore } from '@/stores'

import { Button } from '@components'

const JobSourceAndType = ({ job = null }) => {
    const [setVisitedJobs] = useVisitedJobsStore(state => [state.setVisitedJobs])

    return job ? (
        <>
            <a
                className='rounded-lg !py-1 !px-5 !text-neut800-600 tracking-wider text-sm border !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize inline-flex items-center'
                target='_blank'
                rel='noreferrer'
                href={job?.job_source_url}
                onClick={() => setVisitedJobs(job?.id)}
            >
                Job Source: <span className='ml-2 font-semibold'>{job?.job_source}</span>
            </a>
            <Button
                label={`Job Type: ${job?.job_type}`}
                fit
                classes='!py-1 !px-5 !text-neutral-800 tracking-wider !text-sm !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
            />
        </>
    ) : null
}

export default memo(JobSourceAndType)
