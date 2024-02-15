import { memo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Leads = ({ data }) => (
    <div className='flex flex-col bg-white _shadow-1 rounded-xl'>
        <ResponsiveContainer
            width='98%'
            height={450}
            minWidth={800}
            className='border rounded-lg _shadow-2 bg-[#EDFFFB] mx-auto -mt-8'
        >
            <LineChart data={data} margin={{ top: 40, bottom: 40, right: 30, left: 10 }}>
                <CartesianGrid stroke='#037571' strokeDasharray='3 3' vertical={false} />
                <XAxis
                    dataKey='name'
                    label={{ position: 'insideBottomRight', offset: 0 }}
                    angle={-45}
                    stroke='#037571'
                    interval={0}
                    textAnchor='end'
                    axisLine={false}
                    allowDuplicatedCategory={false}
                    padding={{ right: 5 }}
                />
                <YAxis
                    label={{ angle: -90, position: 'insideLeft' }}
                    stroke='#037571'
                    type='number'
                    domain={[0, 'auto']}
                />
                <Tooltip />
                <Line dataKey='prospects' stroke='#ffd000' strokeWidth='2' activeDot={{ r: 3 }} />
                <Line dataKey='rejected' stroke='#b40008' strokeWidth='2' activeDot={{ r: 3 }} />
                {import.meta.env.VITE_LEADS_ALL === 'true' && (
                    <>
                        <Line dataKey='cold' stroke='#77b2f4' strokeWidth='2' activeDot={{ r: 3 }} />
                        <Line dataKey='warm' stroke='#fcee8c' strokeWidth='2' activeDot={{ r: 3 }} />
                        <Line dataKey='hot' stroke='#ff2000' strokeWidth='2' activeDot={{ r: 3 }} />
                    </>
                )}
            </LineChart>
        </ResponsiveContainer>
        <div className='text-[#006366] px-5 pt-5 pb-4'>
            <span className='text-lg'>Leads</span>
            <hr className='w-[80%] h-0.5 bg-[#048C8C] my-3 border-0 rounded' />
            <span>This chart shows prospects, warm, cold, hot and rejected leads</span>
        </div>
    </div>
)

export default memo(Leads)
