import { Link } from 'react-router-dom'

const App = () => (
    <div className='flex h-screen'>
        <div className='m-auto'>
            <p>Welcome to Octagon Crm</p>
            <Link to='applied-jobs'>Go to Jobs</Link>
        </div>
    </div>
)

export default App
