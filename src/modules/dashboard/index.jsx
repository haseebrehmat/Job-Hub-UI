import { Filters, Statistics, Leads, WeeklyLeads } from '@modules/dashboard/components'

const Dashboard = () => (
    <div className='flex flex-col w-full space-y-8'>
        <Filters />
        <Statistics />
        <Leads />
        <WeeklyLeads />
    </div>
)

export default Dashboard
