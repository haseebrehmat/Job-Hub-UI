import React, { memo } from 'react'
import AnimatedNumber from 'react-animated-number'

import { useJobPortalV2Store } from '@/stores'

import { formatNum } from '@utils/helpers'

const JobsCounts = () => {
    const [counts] = useJobPortalV2Store(state => [state?.counts])

    const JOBS_COUNTS_TYPES = {
        total: 'Total Jobs',
        filtered: 'Filtered',
        recruiter: 'Recruiters',
        non_recruiter: 'Non Recruiters',
        today_uploaded: 'Today`s Jobs',
    }

    return (
        <div className='grid grid-flow-col'>
            {Object.keys(JOBS_COUNTS_TYPES)?.map((d, index) => (
                <div className='flex flex-col gap-y-0.5' key={index}>
                    <AnimatedNumber
                        component='p'
                        initialValue={0}
                        value={Number(counts?.[d] || 1000)}
                        stepPrecision={0}
                        style={{
                            transition: '0.8s ease-out',
                            fontSize: 20,
                            fontWeight: 'bolder',
                            transitionProperty: 'background-color, color, opacity',
                        }}
                        duration={1000}
                        formatValue={n => formatNum(n)}
                    />
                    <p>{JOBS_COUNTS_TYPES?.[d]}</p>
                </div>
            ))}
        </div>
    )
}

export default memo(JobsCounts)
