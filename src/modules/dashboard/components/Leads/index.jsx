import { memo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { SelectBox } from '@components'

import { options } from '@constants/dashboard'

const Leads = ({ data }) => {
    const [selectedOption, setSelectedOption] = useState({ value: 'total', label: 'Total' })

    const handleChange = value => setSelectedOption(value)

    return (
        <div className='flex flex-col bg-white _shadow-1 rounded-xl'>
            <ResponsiveContainer
                width='98%'
                height={550}
                minWidth={800}
                className='border rounded-lg _shadow-2 bg-[#EDFFFB] mx-auto -mt-8'
            >
                <LineChart data={data} margin={{ top: 40, bottom: 100, right: 30, left: 30 }}>
                    <CartesianGrid stroke='#037571' strokeDasharray='3 3' />
                    <XAxis
                        dataKey='name'
                        label={{ position: 'insideBottomRight' }}
                        angle={-40}
                        stroke='#037571'
                        interval={0}
                        textAnchor='end'
                        axisLine={false}
                        allowDuplicatedCategory={false}
                        padding={{ left: 30 }}
                        fontSize={17 - Math.round(data.length / 15)}
                    />
                    <YAxis
                        label={{ angle: -90, position: 'insideLeft' }}
                        stroke='#037571'
                        type='number'
                        axisLine={false}
                        domain={[0, 'auto']}
                    />
                    <Tooltip />
                    {selectedOption.value === 'total' && (
                        <Line
                            dataKey='total'
                            stroke='#048C8C'
                            strokeWidth='2'
                            dot={{ stroke: '#048C8C', strokeWidth: 4, r: 2 }}
                        />
                    )}
                    {selectedOption.value === 'prospect' && (
                        <Line
                            dataKey='prospects'
                            stroke='#ffd000'
                            strokeWidth='2'
                            dot={{ stroke: '#ffd000', strokeWidth: 4, r: 2 }}
                        />
                    )}
                    {selectedOption.value === 'warm' && (
                        <Line
                            dataKey='warm'
                            stroke='#fcee8c'
                            strokeWidth='2'
                            dot={{ stroke: '#fcee8c', strokeWidth: 4, r: 2 }}
                        />
                    )}
                    {selectedOption.value === 'cold' && (
                        <Line
                            dataKey='cold'
                            stroke='#77b2f4'
                            strokeWidth='2'
                            dot={{ stroke: '#77b2f4', strokeWidth: 4, r: 2 }}
                        />
                    )}
                    {selectedOption.value === 'hot' && (
                        <Line
                            dataKey='hot'
                            stroke='#ff2000'
                            strokeWidth='2'
                            dot={{ stroke: '#ff2000', strokeWidth: 4, r: 2 }}
                        />
                    )}
                    {selectedOption.value === 'rejected' && (
                        <Line
                            dataKey='rejected'
                            stroke='#b40008'
                            strokeWidth='2'
                            dot={{ stroke: '#b40008', strokeWidth: 4, r: 2 }}
                        />
                    )}
                    {selectedOption.value === 'hired' && (
                        <Line
                            dataKey='hired'
                            stroke='#32BA7C'
                            strokeWidth='2'
                            dot={{ stroke: '#32BA7C', strokeWidth: 4, r: 2 }}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
            <div className='flex justify-between px-5 pt-5 pb-4'>
                <div className='text-[#006366] w-5/6'>
                    <span className='text-lg'>Leads</span>
                    <hr className='w-[80%] h-0.5 bg-[#048C8C] my-3 border-0 rounded' />
                    <span>This chart shows total, prospects, warm, cold, hot, hired and rejected leads</span>
                </div>
                <div className='text-[#006366] w-1/6'>
                    <SelectBox options={options} selected={selectedOption} handleChange={handleChange} />
                </div>
            </div>
        </div>
    )
}

export default memo(Leads)
