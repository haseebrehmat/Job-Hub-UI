import { Navigate } from 'react-router-dom'

import { AppliedJobs, Login, Jobs, ForgetPassword } from '@modules'

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
        path: '*',
        element: <Navigate to='/' />,
    },
]
