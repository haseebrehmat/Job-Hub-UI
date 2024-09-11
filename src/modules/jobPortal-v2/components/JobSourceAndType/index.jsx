import { memo } from 'react'

import { useVisitedJobsStore } from '@/stores'

import { Button } from '@components'

import { SiteIcon, UserAppliedJobIcon } from '@icons'

const JobSourceAndType = ({ job = null }) => {
    const [setVisitedJobs] = useVisitedJobsStore(state => [state.setVisitedJobs])

    return job ? (
        <>
            <a
                className='!rounded-full !py-0.5 !px-2.5 !gap-2 !text-neutral-600 tracking-wider !text-xs border !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize inline-flex items-center'
                target='_blank'
                rel='noreferrer'
                href={job?.job_source_url}
                onClick={() => setVisitedJobs(job?.id)}
            >
                {SiteIcon} {job?.job_source}
            </a>
            <Button
                label={job?.job_type}
                icon={UserAppliedJobIcon}
                fit
                classes='!rounded-full !py-0.5 !pr-2.5 !gap-0.5 !text-neutral-600 tracking-wider !text-xs !border-neutral-500 !border-opacity-70 hover:!bg-white hover:!text-[#338d8c] hover:!border-[#338d8c] !capitalize'
            />
        </>
    ) : null
}

export default memo(JobSourceAndType)
