import { memo } from 'react'
import { CartesianGrid, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts'

const TechStackBars = ({ data }) => {
    console.log(data.length)

    return (
        <div className='border px-2 pt-10 text-[#1E6570] mt-10 relative'>
            <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>
                Tech Stacks Analytics - Charts
            </p>
            <ResponsiveContainer width='100%' height={600}>
                <BarChart width={500} height={300} data={data} margin={{ top: 0, bottom: 135, right: 30, left: 30 }}>
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
                    <Bar dataKey='value' fill='#4ab9a7'>
                        <LabelList dataKey='value' position='top' fontSize={13} fontWeight='bold' fill='#4ab9a7' />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default memo(TechStackBars)
