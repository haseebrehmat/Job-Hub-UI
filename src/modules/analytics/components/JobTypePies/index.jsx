import { memo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

import { formatNum } from '@utils/helpers'
import { JOB_TYPE_COLORS } from '@constants/analytics'

const JobTypePies = ({ data }) => {
    const renderCustomizedLabel = ({ percent, payload }) =>
        `${formatNum(payload.value)} ${payload.name} (${(percent * 100).toFixed(0)}%)`

    return (
        <div className='border px-200000 pt-10 text-[#1E6570] mt-10 relative w-1/2'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Job Types Analytics - Charts
            </p>
            <ResponsiveContainer width='100%' height={400}>
                <PieChart>
                    <Pie data={data} label={renderCustomizedLabel} outerRadius={130} dataKey='value'>
                        {data.map((_, index) => (
                            <Cell key={`cell-job-type-${index}`} fill={JOB_TYPE_COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(JobTypePies)
