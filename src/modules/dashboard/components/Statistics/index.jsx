import { memo } from 'react'

import { StatCard } from '@components'

import { statsIcons } from '@constants/dashboard'

const Statistics = ({ data, classes }) => (
    <div className={`${classes}`}>
        {data?.length > 0 &&
            data.map(({ name, value }, index) => (
                <StatCard
                    label={name.charAt(0).toUpperCase() + name.slice(1)}
                    value={value}
                    icon={statsIcons[name]}
                    key={name}
                    index={index}
                />
            ))}
    </div>
)

export default memo(Statistics)
