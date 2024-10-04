import { forwardRef, memo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

import { Tooltip as MyTooltip } from '@components'

import { QuartersLegend } from '@modules/analytics/components'

import { htmlToPng } from '@utils/helpers'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const QuarterWiseCategory = forwardRef(({ data = [] }, ref) => {
    const watermark = useRef('')
    const exportButton = useRef('')

    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.add('2xl:flex')
    }

    return data?.data?.length > 0 ? (
        <div className='border px-2 pt-10 pb-20 text-[#1E6570] mt-10 relative' ref={ref}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Quarter Wise Tech Stack Category <span className='text-sm hidden md:inline-block'> - Charts</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm hidden 2xl:flex'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    watermark?.current?.classList.add('flex')
                    exportButton?.current?.classList.remove('2xl:flex')
                    htmlToPng(ref?.current).then(() => postProcessing())
                }}
            >
                <MyTooltip text='Export to png'>{DownloadIcon2}Export</MyTooltip>
            </span>
            <div className='pt-4' id='tech-stack-category-trends-bars'>
                <QuartersLegend />
                <div className='flex flex-col overflow-x-auto'>
                    <ResponsiveContainer minWidth={1590} height={900}>
                        <BarChart data={data?.data} margin={{ top: 40, bottom: 100, right: 10, left: 10 }} barSize={10}>
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis
                                dataKey='category'
                                label={{ position: 'insideBottomRight' }}
                                angle={-25}
                                stroke='#037571'
                                interval={0}
                                textAnchor='end'
                                padding={{ left: 30 }}
                                style={{ textTransform: 'capitalize' }}
                                fontSize={16 - Math.round(data.length / 15)}
                            />
                            <YAxis
                                label={{ angle: -90, position: 'insideLeft' }}
                                stroke='#037571'
                                type='number'
                                tickCount={import.meta.env.VITE_MONTHLY_AND_QUARTERLY_YAXIS_TICKS ?? 10}
                                domain={[data?.min_value, data?.max_value]}
                            />
                            <Tooltip
                                contentStyle={{
                                    textTransform: 'capitalize',
                                    borderRadius: 8,
                                    border: '1px solid #4ab9a7',
                                    fontSize: '13px',
                                    fontWeight: 'bold',
                                }}
                            />
                            <Bar dataKey='q1' fill='#C9B660' />
                            <Bar dataKey='q2' fill='#91C960' />
                            <Bar dataKey='q3' fill='#FF5B33' />
                            <Bar dataKey='q4' fill='#4E6E58' />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className='items-end justify-end mr-4 py-2 -mt-18 hidden' ref={watermark}>
                        <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                        <img src={logo} alt='' width='120' height='120' />
                    </div>
                </div>
            </div>
        </div>
    ) : null
})

export default memo(QuarterWiseCategory)
