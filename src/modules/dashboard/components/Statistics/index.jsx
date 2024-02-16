import { memo } from 'react'

import { StatCard } from '@components'
import { ColdLeadsIcon, HiredIcon, ProspectsIcon, RejectedIcon, TotalIcon, WarmLeadsIcon } from '@icons'

const Statistics = () => {
    const stats = [
        {
            label: 'Total',
            value: 1000,
            icon: TotalIcon,
        },
        {
            label: 'Prospects',
            value: 230,
            icon: ProspectsIcon,
        },
        {
            label: 'Warm Leads',
            value: 400,
            icon: WarmLeadsIcon,
        },
        {
            label: 'Cold Leads',
            value: 100,
            icon: ColdLeadsIcon,
        },
        {
            label: 'Hired',
            value: 10,
            icon: HiredIcon,
        },
        {
            label: 'Rejected',
            value: 90,
            icon: RejectedIcon,
        },
    ]

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8'>
            {stats.length > 0 &&
                stats.map(({ label, value, icon }) => <StatCard label={label} value={value} icon={icon} key={label} />)}
        </div>
    )
}

export default memo(Statistics)
