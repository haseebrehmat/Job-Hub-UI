import { Filters, Statistics, Leads, WarmLeads, TechStacks } from '@modules/dashboard/components'

const Dashboard = () => (
    <div className='flex flex-col w-full space-y-14'>
        <Filters />
        <div className='flex items-start justify-between'>
            <div className='flex flex-col w-4/5 space-y-16'>
                <Leads />
                <TechStacks />
                <WarmLeads />
            </div>
            <div className='w-1/5 pl-6'>
                <Statistics />
            </div>
        </div>
    </div>
)

export default Dashboard
