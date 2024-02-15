import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts'
import data from '../data'

const WeeklyLeads = () => (
    <div className='border rounded-lg shadow-md py-4 overflow-x-auto'>
        <p className='pl-8 text-xl text-[#037571]'>Weekly Leads</p>
        <RadarChart outerRadius={200} width={600} height={500} data={data} className='mx-auto'>
            <PolarGrid stroke='#037571' strokeDasharray='3 3' />
            <PolarAngleAxis dataKey='total' stroke='#037571' />
            <PolarRadiusAxis angle={55} domain={[0, 1000]} stroke='#037571' fillOpacity={0.6} />
            <Radar name='Rejected' dataKey='rejected' stroke='blue' fill='gray' fillOpacity={0.2} strokeWidth='2' />
            <Radar name='Warm Leads' dataKey='warm' stroke='purple' fill='black' fillOpacity={0.2} strokeWidth='2' />
            <Radar name='Cold Leads' dataKey='cold' stroke='yellow' fill='green' fillOpacity={0.2} strokeWidth='2' />
            <Tooltip />
            <Legend
                verticalAlign='top'
                layout='vertical'
                align='right'
                wrapperStyle={{
                    paddingLeft: '25px',
                }}
            />
        </RadarChart>
    </div>
)

export default WeeklyLeads
