import { BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts'

const WarmLeads = ({ data }) => (
    <div className='border rounded-lg _shadow-2 bg-[#EDFFFB] py-4 overflow-x-auto'>
        <p className='pl-8 text-xl text-[#037571]'>Warm Leads</p>
        <ResponsiveContainer width='100%' height={450} minWidth={800}>
            <BarChart
                data={data}
                margin={{
                    top: 40,
                    right: 30,
                    left: 10,
                    bottom: 5,
                }}
            >
                <XAxis
                    dataKey='name'
                    label={{ position: 'insideBottomRight', offset: 0 }}
                    angle={-45}
                    stroke='#037571'
                    interval='preserveStart'
                    textAnchor='end'
                    padding={{ right: 5 }}
                    fontSize={14}
                />
                <YAxis
                    label={{ angle: -90, position: 'insideLeft' }}
                    stroke='#037571'
                    type='number'
                    domain={[0, 'auto']}
                />
                <Tooltip />
                <Legend
                    wrapperStyle={{
                        paddingTop: '35px',
                        marginTop: '15px',
                    }}
                />
                <Bar fill='#fcee8c' dataKey='warm' stackId='abc' barSize={15} />
                <Bar fill='#77b2f4' dataKey='cold' stackId='abc' barSize={15} />
            </BarChart>
        </ResponsiveContainer>
    </div>
)

export default WarmLeads
