import { memo } from 'react'

import { JobsListing, Filters, Taskbar } from '@modules/jobPortal-v2/sections'

const JobPortalV2 = () => (
    <div className='flex flex-col md:flex-row gap-2 px-2.5 h-fit min-h-full'>
        <Filters />
        <div className='flex flex-col gap-2 w-4/5'>
            <Taskbar />
            <JobsListing />
        </div>
    </div>
)

export default memo(JobPortalV2)
