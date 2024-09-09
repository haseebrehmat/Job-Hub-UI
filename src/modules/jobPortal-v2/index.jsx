import { memo } from 'react'

import { JobsListing, Filters } from '@modules/jobPortal-v2/sections'

const JobPortalV2 = () => (
    <div className='flex flex-col md:flex-row gap-2 px-2.5 h-fit min-h-full'>
        <Filters />
        <JobsListing />
    </div>
)

export default memo(JobPortalV2)
