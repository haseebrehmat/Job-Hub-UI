import { memo, useRef } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { Tooltip } from '@components'

import { formatNum, htmlToPng } from '@utils/helpers'
import { JOB_TYPE_NUMBER_STYLE } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'

const JobTypeCounts = ({ data = [], set = null }) => {
    const statRef = useRef('')
    const watermark = useRef('')

    return (
        <div className='border px-2 pt-10 pb-4 mt-10 relative w-1/2'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-[#1E6570] text-lg tracking-widest'>
                Job Types<span className='text-sm'> - Counts</span>
            </p>
            <span
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border text-[#1E6570] bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => {
                    watermark?.current?.classList.remove('hidden')
                    htmlToPng(statRef?.current).then(() => watermark?.current?.classList.add('hidden'))
                }}
            >
                <Tooltip text='Export to png'>{DownloadIcon2}Export</Tooltip>
            </span>
            {data?.length > 0 ? (
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4' ref={statRef} id='job-type-counts'>
                    {data?.map((d, index) => (
                        <div
                            className={`border shadow-md p-3 rounded-xl _gradient-${
                                index + 7
                            } w-full h-40 flex items-center cursor-pointer`}
                            key={index}
                            onClick={() => set({ bar: d.key })}
                        >
                            <div className='flex items-center justify-between text-white pl-2'>
                                <div className='flex flex-col'>
                                    <p className='uppercase text-sm tracking-widest'>{d.name}</p>
                                    <AnimatedNumber2
                                        initialValue={0}
                                        component='p'
                                        value={d.value}
                                        stepPrecision={0}
                                        style={JOB_TYPE_NUMBER_STYLE}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <span className='text-gray-500 col-span-3 text-end px-2 hidden' ref={watermark}>
                        Powered by Octagon
                    </span>
                </div>
            ) : (
                <span className='italic ml-2'>No statistics found yet</span>
            )}
        </div>
    )
}

export default memo(JobTypeCounts)
