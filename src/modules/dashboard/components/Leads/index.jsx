import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, ResponsiveContainer } from 'recharts'
import data from '../data'

const Leads = () => (
    <div className='border rounded-lg shadow-md py-4 overflow-x-auto'>
        <p className='pl-8 text-xl text-[#037571]'>Leads</p>
        <ResponsiveContainer width='100%' height={450} minWidth={800}>
            <ComposedChart
                data={data}
                margin={{
                    top: 40,
                    right: 0,
                    bottom: 40,
                    left: 0,
                }}
            >
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
                <Legend
                    verticalAlign='top'
                    layout='vertical'
                    align='right'
                    wrapperStyle={{
                        paddingLeft: '10px',
                    }}
                />
                <Area type='monotone' dataKey='total' stroke='#037571' fill='#037571' />
                <Line type='monotone' dataKey='hired' stroke='#33FF58' strokeWidth='2' activeDot={{ r: 3 }} />
                <Line type='monotone' dataKey='prospects' stroke='gray' strokeWidth='2' activeDot={{ r: 3 }} />
            </ComposedChart>
        </ResponsiveContainer>
    </div>
)

export default Leads
