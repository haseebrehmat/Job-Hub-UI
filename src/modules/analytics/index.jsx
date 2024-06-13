import { memo, useReducer } from 'react'

import { JobTypeStats, TechStackStats, Filters, JobTypePies, TechStackBars } from '@modules/analytics/components'

import { stacksData, jobstypeData } from './data'
import { ANALYTIC_INITIAL_VALUES } from '@constants/analytics'

const Analytics = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), ANALYTIC_INITIAL_VALUES)

    const filterData = data => data.filter(p => p.name.toLowerCase().includes(vals.query.toLowerCase()))

    return (
        <div className='max-w-full mb-14 px-3 mt-6'>
            <Filters values={vals} set={dispatch} />
            <div className='flex gap-2'>
                <JobTypeStats data={vals.query ? filterData(jobstypeData) : jobstypeData} />
                <JobTypePies data={vals.query ? filterData(jobstypeData) : jobstypeData} />
            </div>
            {/* <JobTypePies data={vals.query ? filterData(jobstypeData) : jobstypeData} value /> */}
            <TechStackBars data={vals.query ? filterData(stacksData) : stacksData} />
            <TechStackStats data={vals.query ? filterData(stacksData) : stacksData} />
        </div>
    )
}
export default memo(Analytics)
