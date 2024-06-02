import { memo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { JobSourceIcons as svgs } from '@svgs'

import './style.css'

const data = [
    {
        name: 'LinkedIn',
        icon: svgs.linkedin,
        key: 'linkedin',
        value: 4000,
    },
    {
        name: 'Indeed',
        icon: svgs.indeed,
        key: 'indeed',
        value: 2000,
    },
    {
        name: 'Glassdoor',
        icon: svgs.glassdoor,
        key: 'glassdoor',
        value: 1900,
    },
    {
        name: 'Monster',
        icon: svgs.linkedin,
        key: 'monster',
        value: 1500,
    },
    {
        name: 'Dice',
        icon: svgs.dice,
        key: 'dice',
        value: 4000,
    },
    {
        name: 'Jooble',
        icon: svgs.jooble,
        key: 'jooble',
        value: 2000,
    },
    {
        name: 'Zip Recuiter',
        icon: svgs.ziprecruiter,
        key: 'ziprecruiter',
        value: 1900,
    },
    {
        name: 'Adzuna',
        icon: svgs.adzuna,
        key: 'adzuna',
        value: 1500,
    },
]

const JobSourceAnalytics = () => (
    <div className='grid grid-cols-8 items-center'>
        {data &&
            data.map(item => (
                <div className='border border-1 p-4 m-2 text-center bg-[#EDFDFB] text-[#1E6570] flex justify-end'>
                    <div className='m-auto text-xl'>{item.icon}</div>
                    <div>
                        <h1 className='text-xl font-bold'>{item.value}</h1>
                        <h3>{item.name}</h3>
                    </div>
                </div>
            ))}
    </div>
)

// const JobSourceAnalytics = memo(({ chartName, chartHeight }) => (
//   <div className='simple_line_chart_analytics border-1 border p-2 m-2' style={{ height: chartHeight }}>
//     <h3 className='text-center text-[#006366] my-2'>{chartName}</h3>
//     <ResponsiveContainer width='100%' height='100%'>
//       <LineChart
//         width={500}
//         height={300}
//         data={data}
//         margin={{
//           top: 5,
//           right: 20,
//           left: 20,
//           bottom: 50,
//         }}
//       >
//         <CartesianGrid strokeDasharray='3 3' />
//         <XAxis dataKey='name' />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line dataKey='value' stroke='#8884d8' />
//       </LineChart>
//     </ResponsiveContainer>
//   </div>
// ))

export default JobSourceAnalytics
