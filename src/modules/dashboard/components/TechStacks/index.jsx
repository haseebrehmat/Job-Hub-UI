import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Tooltip, Text } from 'recharts'

import { dumyTechs as data } from '../data'

function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
    return (
        <Text {...rest} verticalAnchor='middle' y={y + (y - cy) / 8} x={x + (x - cx) / 10}>
            {payload.value}
        </Text>
    )
}

const TechStacks = () => (
    <div className='border rounded-lg shadow-md overflow-x-auto'>
        <p className='pl-8 pt-4 text-xl text-[#037571]'>Weekly Leads</p>
        <RadarChart cx={285} cy={200} outerRadius={150} width={600} height={400} data={data}>
            <PolarGrid stroke='#037571' strokeWidth='0.5' />
            <PolarAngleAxis
                dataKey='techStacks'
                stroke='#037571'
                strokeWidth='0.5'
                tick={props => renderPolarAngleAxis(props)}
                tickLine={false}
            />
            <Tooltip />
            <PolarRadiusAxis
                angle={90}
                domain={[0, 200]}
                interval={3}
                stroke='#00000'
                orientation='middle'
                fontSize={10}
            />
            <Radar name='Devsinc' dataKey='Jobs' stroke='#037571' fill='#037571' fillOpacity={0.2} strokeWidth='1' />
            <Legend
                verticalAlign='top'
                layout='vertical'
                align='right'
                wrapperStyle={{
                    paddingLeft: '10px',
                }}
            />
        </RadarChart>
    </div>
)

export default TechStacks
