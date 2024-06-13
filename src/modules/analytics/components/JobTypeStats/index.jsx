import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { formatNum } from '@utils/helpers'
import { JOB_TYPE_NUMBER_STYLE } from '@constants/analytics'

const JobTypeStats = ({ data = [] }) => (
    <div className='border px-2 pt-10 pb-4 mt-10 relative w-1/2'>
        <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-[#1E6570] text-lg tracking-widest'>
            Job Types Counts
        </p>
        {data?.length > 0 ? (
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 text-gray-600'>
                {data?.map((d, index) => (
                    <div
                        className={`border shadow-md p-3 rounded-xl _gradient-${
                            index + 7
                        } w-full h-40 flex items-center`}
                        key={index}
                    >
                        <div className='flex items-center justify-between text-white'>
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
            </div>
        ) : (
            <span className='italic ml-2'>No statics found yet</span>
        )}
    </div>
)

export default memo(JobTypeStats)
