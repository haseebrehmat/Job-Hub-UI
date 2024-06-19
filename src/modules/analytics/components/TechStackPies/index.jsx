import { memo, useRef, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

import { Tooltip as CustomTooltip } from '@components'

import { formatNum, transformPascal, htmlToPng } from '@utils/helpers'
import { JOB_TYPES, JOB_TYPE_COLORS } from '@constants/analytics'

import { BreadIcon, DownloadIcon2 } from '@icons'

const TechStackPies = ({ data = {}, stack = null }) => {
    const chartRef = useRef('')
    const memoizedData = useMemo(
        () =>
            Object.entries(data)
                .slice(1)
                .map(([name, value]) => ({ name: JOB_TYPES[name], value })),
        [data, stack]
    )
    const renderCustomizedLabel = ({ percent, payload }) =>
        `${formatNum(payload.value)} ${transformPascal(payload.name)
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')} (${(percent * 100).toFixed(0)}%)`

    return (
        <div className='border px-200000 pt-10 text-[#1E6570] mt-10 relative w-1/2'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stack<span className='text-sm'> - Charts</span>
            </p>
            <span
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => htmlToPng(chartRef?.current)}
            >
                <CustomTooltip text='Export to png'>{DownloadIcon2}Export</CustomTooltip>
            </span>
            <div ref={chartRef}>
                <ResponsiveContainer width='100%' height={400}>
                    <PieChart>
                        <Pie
                            data={memoizedData}
                            label={renderCustomizedLabel}
                            innerRadius={90}
                            outerRadius={120}
                            dataKey='value'
                            animationBegin={0}
                            animationDuration={300}
                        >
                            {memoizedData.map((_, index) => (
                                <Cell key={`cell-job-type-${index}`} fill={JOB_TYPE_COLORS[index]} fillOpacity={0.8} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <p className='text-center text-lg font-bold uppercase tracking-wider'>{stack ?? 'No stack'}</p>
                <div className='grid grid-cols-2 p-4 mt-6'>
                    {Object.keys(JOB_TYPES)
                        .slice(0, Object.keys(JOB_TYPES).length - 1)
                        .map(key => (
                            <div className='flex items-center' key={key}>
                                <span>
                                    {transformPascal(JOB_TYPES[key])
                                        .split(' ')
                                        .map(word => word.charAt(0).toUpperCase())
                                        .join('')}
                                </span>
                                <span className='mx-2'>{BreadIcon}</span>
                                <span className='text-sm'>{transformPascal(JOB_TYPES[key])}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default memo(TechStackPies)
