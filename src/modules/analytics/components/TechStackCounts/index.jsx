import { memo, useRef } from 'react'

import { Tooltip } from '@components'

import { formatNum, htmlToPng } from '@utils/helpers'
import { TECH_STACK_NUMBER_STYLE } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'

const TechStackCounts = ({ data = [], set = null, stack = null }) => {
    const statsRef = useRef('')

    return (
        <div className='border px-2 pt-10 pb-4 text-[#1E6570] mt-10 relative w-1/2'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stacks<span className='text-sm'> - Counts</span>
            </p>
            <span
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => htmlToPng(statsRef?.current)}
            >
                <Tooltip text='Export to png'>{DownloadIcon2}Export</Tooltip>
            </span>
            {data?.length > 0 ? (
                <div
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
                    ref={statsRef}
                    id='tech-stack-counts'
                >
                    {data?.map((d, index) => (
                        <div
                            className={`border shadow-md pl-2 pr-3 py-2 ${
                                stack === d.name ? 'bg-[#c4f5ed] border-cyan-300' : 'bg-[#edfdfb]'
                            } w-full cursor-pointer hover:bg-[#c4f5ed] hover:text-[#1E6570] `}
                            key={index}
                            onClick={() => set({ stack: d.name })}
                        >
                            <div className='flex items-center justify-between'>
                                <div className='flex flex-col'>
                                    <span style={TECH_STACK_NUMBER_STYLE}>{formatNum(d.total)}</span>
                                    <p className='uppercase text-xs tracking-widest'>{d.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <span className='italic ml-2'>No statics found yet</span>
            )}
        </div>
    )
}
export default memo(TechStackCounts)
