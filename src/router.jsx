import { createBrowserRouter, Link, Navigate } from 'react-router-dom'

import { Protected, } from '@components'

import { AppliedJobs, Login } from '@modules'
import SideBar from '@/modules/layout/Sidebar'

const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: '/',
        element: (
            <div className='flex h-screen'>
                <SideBar />
                <div className='m-auto'>
                    <p>Welcome to Octagon Crm</p>
                    <Link to='applied-jobs'>Go to Jobs</Link>
                </div>
            </div>
        ),
    },
    {
        path: 'applied-jobs',
        element: (
            <Protected>
                <AppliedJobs />
            </Protected>
        ),
    },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
])

export default router
