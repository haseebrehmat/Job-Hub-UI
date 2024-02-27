import { Navigate } from 'react-router-dom'

import { AppliedJobs, Login, Jobs, JobsFilter, JobsUploader, ForgetPassword, ResetPassword, Companies } from '@modules'

import { getToken } from '@utils/helpers'
import App from './App'

export const routes = [
    {
        path: '/',
        component: <App />,
        protect: true,
        title: 'Octagon Dashboard',
    },
    {
        path: '/applied-jobs',
        component: <AppliedJobs />,
        protect: true,
        title: 'Applied Jobs',
    },
    {
        path: '/jobs',
        component: <Jobs />,
        protect: true,
        title: 'Team Appllied Jobs',
    },
    {
        path: '/jobs-portal',
        component: <JobsFilter />,
        protect: true,
        title: 'Jobs Portal',
    },
    {
        path: '/jobs-uploader',
        component: <JobsUploader />,
        protect: true,
        title: 'Job Uploader',
    },
    {
        path: '/companies',
        component: <Companies />,
        protect: true,
        title: 'Companies Management',
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
