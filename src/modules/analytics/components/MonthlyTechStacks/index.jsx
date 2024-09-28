import { forwardRef, memo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

import { Tooltip as MyTooltip } from '@components'

import { MonthsLegend } from '@modules/analytics/components'

import { htmlToPng } from '@utils/helpers'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const MonthlyTechStacks = forwardRef(({ data = [] }, ref) => {
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.add('2xl:flex')
    }

    return data?.length > 0 ? (
        <div className='border px-2 pt-10 pb-10 text-[#1E6570] mt-10 relative' ref={ref}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Monthly Tech Stacks
                <span className='text-sm'> - Charts</span>
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
            <MonthsLegend />
            <div className='overflow-x-auto'>
                <ResponsiveContainer minWidth={1590} height={750}>
                    <BarChart height={300} data={data} margin={{ top: 15, bottom: 150, right: 5, left: 5 }}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis
                            dataKey='name'
                            label={{ position: 'insideBottomRight' }}
                            angle={-40}
                            stroke='#037571'
                            interval={0}
                            textAnchor='end'
                            padding={{ left: 20 }}
                            fontSize={17 - Math.round(data.length / 15)}
                        />
                        <YAxis
                            label={{ angle: -90, position: 'insideLeft' }}
                            stroke='#037571'
                            type='number'
                            domain={[0, 'auto']}
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
                        <Bar barSize={4} dataKey='january' fill='#C9B660' />
                        <Bar barSize={4} dataKey='february' fill='#91C960' />
                        <Bar barSize={4} dataKey='march' fill='#FF5B33' />
                        <Bar barSize={4} dataKey='april' fill='#862c4d' />
                        <Bar barSize={4} dataKey='may' fill='#62c9d3' />
                        <Bar barSize={4} dataKey='june' fill='#5967ff' />
                        <Bar barSize={4} dataKey='july' fill='#0a7e8c' />
                        <Bar barSize={4} dataKey='august' fill='#895734' />
                        <Bar barSize={4} dataKey='september' fill='#890734' />
                        <Bar barSize={4} dataKey='october' fill='#240046' />
                        <Bar barSize={4} dataKey='november' fill='#3a506b' />
                        <Bar barSize={4} dataKey='december' fill='#006ba6' />
                    </BarChart>
                </ResponsiveContainer>
                <div className='items-end justify-end mr-4 py-4 hidden' ref={watermark}>
                    <span className='text-cyan-900 col-span-3  px-2 font-bold'>Powered by</span>
                    <img src={logo} alt='' width='120' height='120' />
                </div>
            </div>
        </div>
    ) : null
})

export default memo(MonthlyTechStacks)
