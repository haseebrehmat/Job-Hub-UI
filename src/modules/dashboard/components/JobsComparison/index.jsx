import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { formatNum } from '@utils/helpers'

import { UpIcon, UptoIcon, DownIcon } from '@icons'

const JobsComparison = ({ data = null }) =>
    data ? (
        <div className='pb-5 pl-2'>
            <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                <div className='flex flex-col tracking-widest w-full'>
                    <p className='text-lg text-gray-700 border-b font-semibold'>Jobs Stats</p>
                    <small className='text-gray-500 pb-3'>Market Comparison of Jobs presense</small>
                    <div className='inline-flex gap-4 items-center text-gray-700 pb-1'>
                        Previous Month {UptoIcon} Current Month
                    </div>
                    <div className='inline-flex gap-4 items-center'>
                        <AnimatedNumber2
                            initialValue={0}
                            component='p'
                            value={data?.month?.previous_count}
                            stepPrecision={0}
                            style={{ fontSize: 24 }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                        {UptoIcon}
                        <AnimatedNumber2
                            initialValue={0}
                            component='p'
                            value={data?.month?.current_count}
                            stepPrecision={0}
                            style={{ fontSize: 24 }}
                            duration={1000}
                            formatValue={n => formatNum(n)}
                        />
                    </div>
                    <span
                        className={`inline-flex gap-4 pt-2.5  ${
                            data?.month?.alteration === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                    >
                        {data?.month?.percentage} %<span>{data?.month?.alteration === 'up' ? UpIcon : DownIcon}</span>
                    </span>
                </div>
            </div>
        </div>
    ) : null

export default memo(JobsComparison)
