import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Protected } from '@components'

import { AppliedJobs, Login, AppLayout } from '@modules'

import App from './App'

const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login />,
    },
    {
        path: '/',
        element: (
            <AppLayout>
                <App />
            </AppLayout>
        ),
    },
    {
        path: 'applied-jobs',
        element: (
            <Protected>
                <AppLayout>
                    <AppliedJobs />
                </AppLayout>
            </Protected>
        ),
    },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
])

export default router
