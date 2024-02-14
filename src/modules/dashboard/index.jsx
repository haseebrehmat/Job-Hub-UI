import { Filters, Statistics } from '@modules/dashboard/components'

const Dashboard = () => (
    <div className='flex flex-col w-full space-y-8'>
        <Filters />
        <Statistics />
    </div>
)

export default Dashboard
