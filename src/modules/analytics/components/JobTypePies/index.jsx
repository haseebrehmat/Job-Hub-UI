import { formatNum } from '@utils/helpers'
import { memo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

import { JOB_TYPE_COLORS } from '@constants/analytics'

const JobTypePies = ({ data, value = false }) => {
    const renderCustomizedLabel = ({ percent, payload }) =>
        value ? payload.value : `${formatNum(payload.value)} ${payload.name} (${(percent * 100).toFixed(0)}%)`

    return (
        <div className='border px-2 pt-10 text-[#1E6570] mt-10 relative w-1/2'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Job Types Analytics By {value ? 'Values' : 'Percentages'} - Charts
            </p>
            <ResponsiveContainer width='100%' height={400}>
                <PieChart>
                    <Pie data={data} label={renderCustomizedLabel} outerRadius={150} dataKey='value'>
                        {data.map((entry, index) => (
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
