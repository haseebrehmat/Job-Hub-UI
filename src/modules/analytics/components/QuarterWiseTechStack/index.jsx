import { forwardRef, memo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

import { Tooltip as MyTooltip } from '@components'

import { htmlToPng } from '@utils/helpers'

import { DownloadIcon2 } from '@icons'
import logo from '@images/signin-logo.svg'

const QuarterWiseTechStack = forwardRef(({ data = [] }, ref) => {
    const watermark = useRef('')
    const exportButton = useRef('')
    const postProcessing = () => {
        watermark?.current?.classList.add('hidden')
        exportButton?.current?.classList.remove('hidden')
    }

    return data?.length > 0 ? (
        <div className='border px-2 pt-10 pb-10 text-[#1E6570] mt-10 relative' ref={ref}>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Quarter Wise Tech Stacks
                <span className='text-sm'> - Charts</span>
            </p>
            <span
                ref={exportButton}
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    watermark?.current?.classList.add('flex')
                    exportButton?.current?.classList.add('hidden')
                    htmlToPng(ref?.current).then(() => postProcessing())
                }}
            >
                <MyTooltip text='Export to png'>{DownloadIcon2}Export</MyTooltip>
            </span>
            <div className='w-full flex justify-end gap-6 px-4 flex-wrap'>
                <div className='flex gap-2 items-center text-[#C9B660]'>
                    <span className='bg-[#C9B660] px-4 py-1.5' />
                    <span>Quarter 1</span>
                </div>
                <div className='flex gap-2 items-center text-[#91C960]'>
                    <span className='bg-[#91C960] px-4 py-1.5' />
                    <span>Quarter 2</span>
                </div>
                <div className='flex gap-2 items-center text-[#FF5B33]'>
                    <span className='bg-[#FF5B33] px-4 py-1.5' />
                    <span>Quarter 3</span>
                </div>
            </div>
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
                            allowDuplicatedCategory={false}
                            padding={{ left: 20 }}
                            fontSize={17 - Math.round(data.length / 15)}
                        />
                        <YAxis
                            label={{ angle: -90, position: 'insideLeft' }}
                            stroke='#037571'
                            type='number'
                            domain={[0, 'auto']}
                        />
                        <Tooltip />
                        <Bar dataKey='q1' fill='#C9B660' />
                        <Bar dataKey='q2' fill='#91C960' />
                        <Bar dataKey='q3' fill='#FF5B33' />
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

export default memo(QuarterWiseTechStack)
