import { memo } from 'react'
import AnimatedNumber2 from 'react-animated-number'

import { formatNum } from '@utils/helpers'

import { UpIcon, UptoIcon } from '@icons'

const ThrivingSources = ({ data = null }) =>
    data ? (
        <div className='pb-5 pl-2'>
            <div className='border shadow-lg p-4 rounded-xl flex items-start'>
                <div className='flex flex-col tracking-widest w-full'>
                    <p className='text-lg text-gray-700 border-b font-semibold'>Thriving Job Sources</p>
                    <small className='text-gray-500'>List of Thrived Job Sources</small>
                    {data?.month?.map((item, index) => (
                        <div className='flex items-center justify-between pt-3' key={index}>
                            <div className='flex flex-col'>
                                <p className='font-semibold text-[#4f9d9b] uppercase'>{item?.source}</p>
                                <div className='inline-flex gap-3 text-slate-700'>
                                    <AnimatedNumber2
                                        initialValue={0}
                                        component='span'
                                        value={item?.previous_count}
                                        stepPrecision={0}
                                        style={{ fontSize: 12 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                    {UptoIcon}
                                    <AnimatedNumber2
                                        initialValue={0}
                                        component='span'
                                        value={item?.current_count}
                                        stepPrecision={0}
                                        style={{ fontSize: 12 }}
                                        duration={1000}
                                        formatValue={n => formatNum(n)}
                                    />
                                </div>
                            </div>
                            <span className='inline-flex gap-4 text-green-500'>
                                {item?.percentage} %<span>{UpIcon}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    ) : null

export default memo(ThrivingSources)
