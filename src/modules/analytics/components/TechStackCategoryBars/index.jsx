import { forwardRef, memo } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList } from 'recharts'

import { Tooltip as MyTooltip } from '@components'
import { TechStackCategoryTooltip } from '@modules/analytics/components'

import { htmlToPng } from '@utils/helpers'
import { JOB_TYPES, JOB_TYPE_COLORS2 } from '@constants/analytics'

import { DownloadIcon2 } from '@icons'

const TechStackCategoryBars = forwardRef(({ data = [] }, ref) =>
    data?.length > 0 ? (
        <div className='border px-2 pt-10 text-[#1E6570] mt-10 relative'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stack Category<span className='text-sm'> - Charts</span>
            </p>
            <span
                className='-mt-14 rounded-full absolute py-1 pr-4 pl-3 border bg-[#EDFDFB] right-2 cursor-pointer text-sm'
                onClick={() => htmlToPng(ref?.current)}
            >
                <MyTooltip text='Export to png'>{DownloadIcon2}Export</MyTooltip>
            </span>
            <div ref={ref} className='pt-4'>
                <div className='w-full flex justify-end gap-6 px-3'>
                    {Object.keys(JOB_TYPES)
                        .reverse()
                        .map((row, index) => (
                            <div key={index} className='flex gap-2 items-center'>
                                <span style={{ backgroundColor: JOB_TYPE_COLORS2[row] }} className='px-4 py-1.5' />
                                <span>{JOB_TYPES[row]}</span>
                            </div>
                        ))}
                </div>
                <ResponsiveContainer width='100%' height={900}>
                    <BarChart
                        data={data}
                        margin={{ top: 40, bottom: 150, right: 10, left: 10 }}
                        barSize={40 - Math.round(data.length / 15)}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis
                            dataKey='name'
                            label={{ position: 'insideBottomRight' }}
                            angle={-20}
                            stroke='#037571'
                            interval={0}
                            textAnchor='end'
                            padding={{ left: 30 }}
                            fontSize={16 - Math.round(data.length / 15)}
                        />
                        <YAxis
                            label={{ angle: -90, position: 'insideLeft' }}
                            stroke='#037571'
                            type='number'
                            domain={[0, 'auto']}
                        />
                        <Tooltip content={<TechStackCategoryTooltip />} />
                        {Object.keys(JOB_TYPES).map((row, idx) => (
                            <Bar dataKey={row} fill={JOB_TYPE_COLORS2[row]} stackId='a' key={idx}>
                                {row === 'total' && (
                                    <LabelList dataKey={row} position='top' fill={JOB_TYPE_COLORS2[row]} />
                                )}
                            </Bar>
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    ) : null
)

export default memo(TechStackCategoryBars)
