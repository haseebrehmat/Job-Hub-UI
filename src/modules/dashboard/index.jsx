import { Filters, Statistics, Leads, WarmLeads, TechStacks } from '@modules/dashboard/components'

const Dashboard = () => (
    <div className='flex flex-col w-full space-y-14'>
        <Filters />
        <div className='flex items-start justify-between'>
            <div className='flex flex-col w-4/5 space-y-8'>
                <Leads />
                <WarmLeads />
                <TechStacks />
            </div>
            <Statistics />
        </div>
    </div>
)

export default Dashboard
