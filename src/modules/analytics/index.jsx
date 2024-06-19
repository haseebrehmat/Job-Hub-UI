import { memo, useReducer } from 'react'

import {
    JobTypeCounts,
    TechStackCounts,
    Filters,
    JobTypePies,
    TechStackBars,
    TechStackPies,
    Trends,
} from '@modules/analytics/components'

import { stacksData, jobstypeData, trendsData } from '@modules/analytics/api/data'

import { ANALYTIC_INITIAL_VALUES } from '@constants/analytics'

const Analytics = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), ANALYTIC_INITIAL_VALUES)

    const filterQuery = data => data.filter(p => p.name.toLowerCase().includes(vals.query.toLowerCase()))

    return (
        <div className='max-w-full mb-14 px-3 mt-6'>
            <Filters values={vals} set={dispatch} />
            <div className='flex gap-2'>
                <JobTypeCounts data={vals.query ? filterQuery(jobstypeData) : jobstypeData} set={dispatch} />
                <JobTypePies data={vals.query ? filterQuery(jobstypeData) : jobstypeData} />
            </div>
            <TechStackBars data={vals.query ? filterQuery(stacksData) : stacksData} type={vals.bar} set={dispatch} />
            <div className='flex gap-2'>
                <TechStackCounts
                    data={vals.query ? filterQuery(stacksData) : stacksData}
                    set={dispatch}
                    stack={vals.stack}
                />
                <TechStackPies data={stacksData.find(row => row.name === vals.stack)} stack={vals.stack} />
            </div>
            <Trends data={trendsData} />
        </div>
    )
}
export default memo(Analytics)
