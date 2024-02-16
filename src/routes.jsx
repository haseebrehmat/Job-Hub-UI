import { Navigate } from 'react-router-dom'

import { AppliedJobs, Login, Jobs, ForgetPassword, ResetPassword } from '@modules'

import { getToken } from '@utils/helpers'
import App from './App'

export const routes = [
    {
        path: '/',
        component: <App />,
        protect: true,
    },
    {
        path: '/applied-jobs',
        component: <AppliedJobs />,
        protect: true,
    },
    {
        path: '/jobs',
        component: <Jobs />,
        protect: true,
    },
]

export const authRoutes = [
    {
        path: 'login',
        element: getToken() ? <Navigate to='/' /> : <Login />,
    },
    {
        path: 'forget-password',
        element: getToken() ? <Navigate to='/' /> : <ForgetPassword />,
    },
    {
        path: 'reset-password',
        element: <ResetPassword />,
    },
    {
        path: '*',
        element: <Navigate to='/' />,
    },
]
