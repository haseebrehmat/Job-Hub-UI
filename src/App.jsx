import { Link } from 'react-router-dom'
import { Dashboard } from '@modules'

const App = () => (
    <div className='flex flex-col px-2'>
        <Link to='applied-jobs' className='text-[#006366] font-medium text-2xl mb-1 -mt-5'>
            Welcome to Octagon
        </Link>
        <Dashboard />
    </div>
)

export default App
