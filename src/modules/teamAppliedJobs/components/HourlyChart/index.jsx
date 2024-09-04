import { memo, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

import { CustomSelector } from '@components'

import { parseMembers } from '@utils/helpers'

const HourlyChart = ({ members = null }) => {
    const [selectedMember, setSelectedMember] = useState({ value: 'all', label: 'All Team Members' })

    const data = [
        {
            time: '12:00 PM',
            jobs: 23,
        },
        {
            time: '01:00 AM',
            jobs: 345,
        },
        {
            time: '02:00 AM',
            jobs: 0,
        },
        {
            time: '03:00 AM',
            jobs: 23,
        },
        {
            time: '04:00 AM',
            jobs: 12,
        },
        {
            time: '05:00 AM',
            jobs: 120,
        },
        {
            time: '06:00 AM',
            jobs: 60,
        },
        {
            time: '07:00 AM',
            jobs: 1,
        },
        {
            time: '08:00 AM',
            jobs: 90,
        },
        {
            time: '09:00 AM',
            jobs: 20,
        },
        {
            time: '10:00 AM',
            jobs: 7,
        },
        {
            time: '11:00 AM',
            jobs: 79,
        },
        {
            time: '12:00 AM',
            jobs: 65,
        },
    ]

    return (
        <div className='flex flex-col'>
            <div className='flex px-4 pb-2 items-end justify-between'>
                <span className='text-[#048C8C] font-semibold italic tracking-wider'>
                    {selectedMember?.label ?? 'No BD Selected'}
                </span>
                <span className='min-w-[14rem]'>
                    <CustomSelector
                        options={parseMembers(members, null, true)}
                        handleChange={obj => setSelectedMember(obj)}
                        selectorValue={selectedMember}
                        placeholder='Select Member'
                    />
                </span>
            </div>
            <ResponsiveContainer
                width='98%'
                height={400}
                minWidth={800}
                className='border rounded-lg _shadow-2 bg-[#EDFFFB] mx-auto'
            >
                <LineChart data={data} margin={{ top: 40, bottom: 50, right: 30, left: 20 }}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                        dataKey='time'
                        stroke='#037571'
                        angle={-25}
                        interval={0}
                        textAnchor='end'
                        allowDuplicatedCategory={false}
                        fontSize={14}
                    />
                    <YAxis stroke='#037571' type='number' domain={[0, 'auto']} />
                    <Tooltip />
                    <Line
                        dataKey='jobs'
                        stroke='#048C8C'
                        strokeWidth='2'
                        dot={{ stroke: '#048C8C', strokeWidth: 2, r: 5 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(HourlyChart)
