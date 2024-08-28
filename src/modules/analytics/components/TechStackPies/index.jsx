import { memo, useRef, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

import { Tooltip as CustomTooltip } from '@components'

import { formatNum, transformPascal, htmlToPng } from '@utils/helpers'
import { JOB_TYPES, JOB_TYPE_COLORS2 } from '@constants/analytics'

import { BreadIcon, DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const TechStackPies = ({ data = {}, stack = null }) => {
    const chartRef = useRef('')
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
    }

    const memoizedData = useMemo(
        () =>
            Object.entries(data)
                ?.filter(([key]) => !['total', 'name'].includes(key))
                ?.map(([name, value]) => ({ name: JOB_TYPES[name], value, key: name }))
                ?.filter(({ value }) => value > 0),
        [data, stack]
    )

    const renderCustomizedLabel = ({ percent, payload }) =>
        `${formatNum(payload.value)} ${transformPascal(payload.name)
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('')} (${(percent * 100).toFixed(2)}%)`

    return (
        <div className='border px-200000 pt-10 pb-10 text-[#1E6570] mt-10 relative w-1/2' ref={chartRef}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stack<span className='text-sm'> - Charts</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    exportButton?.current?.classList.add('hidden')
                    htmlToPng(chartRef?.current).then(() => postProcessing())
                }}
            >
                <CustomTooltip text='Export to png'>{DownloadIcon2}Export</CustomTooltip>
            </span>
            <div id='tech-stack-pies'>
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
                            {memoizedData.map((row, index) => (
                                <Cell
                                    key={`cell-job-type-${index}`}
                                    fill={JOB_TYPE_COLORS2[row.key]}
                                    fillOpacity={0.8}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                <p className='text-center text-lg font-bold uppercase tracking-wider'>{stack ?? 'No stack'}</p>
                <div className='grid grid-cols-2 p-4 mt-6'>
                    {Object.keys(JOB_TYPES)
                        .filter(key => key !== 'total')
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
                <div className='flex items-end justify-end mr-4 py-4 hidden' ref={watermark}>
                    <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                    <img src={logo} alt='' width='120' height='120' />
                </div>
            </div>
        </div>
    )
}

export default memo(TechStackPies)
