import { memo, useRef } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts'

import { Tooltip } from '@components'

import { htmlToPng } from '@utils/helpers'
import { JOB_TYPE_COLORS, JOB_TYPES } from '@constants/analytics'

import { SearchClearIcon, DownloadIcon2 } from '@icons'

const TechStackBars = ({ data = [], type = 'total', set = null }) => {
    const barRef = useRef('')

    return (
        <div className='border px-2 pt-10 text-[#1E6570] mt-10 relative'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stacks Analytics - Charts
            </p>
            <span
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => htmlToPng(barRef?.current?.current)}
            >
                <Tooltip text='Export to png'>{DownloadIcon2}Export</Tooltip>
            </span>
            {type !== 'total' && (
                <div className='mb-1 mr-3 cursor-pointer flex justify-end' onClick={() => set({ bar: 'total' })}>
                    <span className='text-sm pl-3 pr-2 border border-[#1E6570] rounded-full flex items-center'>
                        {JOB_TYPES[type]}
                        {SearchClearIcon}
                    </span>
                </div>
            )}
            <ResponsiveContainer width='100%' height={750} ref={barRef}>
                <BarChart height={300} data={data} margin={{ top: 5, bottom: 150, right: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                        dataKey='name'
                        label={{ position: 'insideBottomRight' }}
                        angle={-40}
                        stroke='#037571'
                        interval={0}
                        textAnchor='end'
                        allowDuplicatedCategory={false}
                        padding={{ left: 30 }}
                        fontSize={17 - Math.round(data.length / 15)}
                    />
                    <YAxis
                        label={{ angle: -90, position: 'insideLeft' }}
                        stroke='#037571'
                        type='number'
                        domain={[0, 'auto']}
                    />
                    {type === 'contract_on_site' && (
                        <Bar dataKey={entry => parseInt(entry.value / 2)} stackId='a' fill={JOB_TYPE_COLORS[0]}>
                            <LabelList
                                dataKey={entry => parseInt(entry.value / 2)}
                                position='top'
                                fontSize={13}
                                fontWeight='bold'
                                fill={JOB_TYPE_COLORS[0]}
                            />
                        </Bar>
                    )}
                    {type === 'contract_remote' && (
                        <Bar dataKey={entry => parseInt(entry.value / 2.5)} stackId='a' fill={JOB_TYPE_COLORS[1]}>
                            <LabelList
                                dataKey={entry => parseInt(entry.value / 2.5)}
                                position='top'
                                fontSize={13}
                                fontWeight='bold'
                                fill={JOB_TYPE_COLORS[1]}
                            />
                        </Bar>
                    )}
                    {type === 'full_time_on_site' && (
                        <Bar dataKey={entry => parseInt(entry.value / 3)} stackId='a' fill={JOB_TYPE_COLORS[2]}>
                            <LabelList
                                dataKey={entry => parseInt(entry.value / 3)}
                                position='top'
                                fontSize={13}
                                fontWeight='bold'
                                fill={JOB_TYPE_COLORS[2]}
                            />
                        </Bar>
                    )}
                    {type === 'full_time_remote' && (
                        <Bar dataKey={entry => parseInt(entry.value / 4)} stackId='a' fill={JOB_TYPE_COLORS[3]}>
                            <LabelList
                                dataKey={entry => parseInt(entry.value / 4)}
                                position='top'
                                fontSize={13}
                                fontWeight='bold'
                                fill={JOB_TYPE_COLORS[3]}
                            />
                        </Bar>
                    )}
                    {type === 'hybrid_on_site' && (
                        <Bar dataKey={entry => parseInt(entry.value / 5)} stackId='a' fill={JOB_TYPE_COLORS[4]}>
                            <LabelList
                                dataKey={entry => parseInt(entry.value / 5)}
                                position='top'
                                fontSize={13}
                                fontWeight='bold'
                                fill={JOB_TYPE_COLORS[4]}
                            />
                        </Bar>
                    )}
                    {type === 'hybrid_remote' && (
                        <Bar dataKey={entry => parseInt(entry.value / 6)} stackId='a' fill={JOB_TYPE_COLORS[5]}>
                            <LabelList
                                dataKey={entry => parseInt(entry.value / 6)}
                                position='top'
                                fontSize={13}
                                fontWeight='bold'
                                fill={JOB_TYPE_COLORS[5]}
                            />
                        </Bar>
                    )}
                    {type === 'total' && (
                        <Bar dataKey='value' stackId='a' fill={JOB_TYPE_COLORS[6]}>
                            <LabelList
                                dataKey='value'
                                position='top'
                                fontSize={13}
                                fontWeight='bold'
                                fill={JOB_TYPE_COLORS[6]}
                            />
                        </Bar>
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(TechStackBars)
