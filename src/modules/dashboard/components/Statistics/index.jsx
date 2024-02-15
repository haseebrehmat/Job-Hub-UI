import { memo } from 'react'

import { StatCard } from '@components'
import { Cold, Hired, Prospect, Rejected, Total, Warm, Hot } from '@svgs'

const Statistics = () => {
    const stats = [
        {
            label: 'Total',
            value: 1000,
            icon: Total,
        },
        {
            label: 'Prospect',
            value: 230,
            icon: Prospect,
        },
        {
            label: 'Cold',
            value: 100,
            icon: Cold,
        },
        {
            label: 'Warm',
            value: 400,
            icon: Warm,
        },
        {
            label: 'Hot',
            value: 10,
            icon: Hot,
        },
        {
            label: 'Rejected',
            value: 90,
            icon: Rejected,
        },
        {
            label: 'Hired',
            value: 10,
            icon: Hired,
        },
    ]

    return (
        <div className='flex flex-col space-y-8 w-1/5 pl-5'>
            {stats.length > 0 &&
                stats.map(({ label, value, icon }, index) => (
                    <StatCard label={label} value={value} icon={icon} key={label} index={index} />
                ))}
        </div>
    )
}

export default memo(Statistics)
