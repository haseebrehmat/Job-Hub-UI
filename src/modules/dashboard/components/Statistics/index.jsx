import { memo } from 'react'

import { StatCard } from '@components'

import { dumyStats as stats } from '../data'

const Statistics = () => (
    <div className='flex flex-col space-y-8'>
        {stats.length > 0 &&
            stats.map(({ label, value, icon }, index) => (
                <StatCard label={label} value={value} icon={icon} key={label} index={index} />
            ))}
    </div>
)

export default memo(Statistics)
