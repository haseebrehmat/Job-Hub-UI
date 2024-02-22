import { Navigate } from 'react-router-dom'

import { AppliedJobs, Login, Jobs, JobsFilter, JobsUploader, ForgetPassword, ResetPassword, Companies } from '@modules'

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
    {
        path: '/jobs-portal',
        component: <JobsFilter />,
        protect: true,
    },
    {
        path: '/jobs-uploader',
        component: <JobsUploader />,
        protect: true,
    },
    {
        path: '/companies',
        component: <Companies />,
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
