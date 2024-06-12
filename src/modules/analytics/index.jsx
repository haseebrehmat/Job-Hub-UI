import { memo } from 'react'

import { JobTypesStats, TechStackStats } from '@modules/analytics/components'

import { stacksData, jobstypeData } from './data'

const Analytics = () => (
    <div className='max-w-full mb-14 px-3 mt-6'>
        <JobTypesStats data={jobstypeData} />
        <TechStackStats data={stacksData} />
    </div>
)

export default memo(Analytics)
