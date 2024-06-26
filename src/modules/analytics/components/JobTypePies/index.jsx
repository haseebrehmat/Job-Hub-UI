import { memo, useRef } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

import { Tooltip } from '@components'

import { formatNum, htmlToPng } from '@utils/helpers'
import { JOB_TYPE_COLORS2 } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'

const JobTypePies = ({ data }) => {
    const chartRef = useRef('')

    const renderCustomizedLabel = ({ percent, payload }) =>
        `${formatNum(payload.value)} ${payload.name} (${(percent * 100).toFixed(2)}%)`

    return (
        <div className='border px-200000 pt-10 text-[#1E6570] mt-10 relative w-1/2'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest ml-2'>
                Job Types<span className='text-sm'> - Charts</span>
            </p>
            <span
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => htmlToPng(chartRef?.current?.current)}
            >
                <Tooltip text='Export to png'>{DownloadIcon2}Export</Tooltip>
            </span>
            <ResponsiveContainer width='100%' height={400} ref={chartRef}>
                <PieChart>
                    <Pie
                        data={data?.filter(({ value }) => value > 0)}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                        dataKey='value'
                        animationBegin={0}
                        animationDuration={300}
                    >
                        {data
                            ?.filter(({ value }) => value > 0)
                            .map((row, index) => (
                                <Cell key={`cell-job-type-${index}`} fill={JOB_TYPE_COLORS2[row.key]} />
                            ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(JobTypePies)
