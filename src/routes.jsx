import { Navigate } from 'react-router-dom'

import {
    AppliedJobs,
    Login,
    TeamAppliedJobs,
    JobsFilter,
    JobsUploader,
    ForgetPassword,
    ResetPassword,
    Companies,
    Roles,
    Users,
} from '@modules'

import { getToken, decodeJwt } from '@utils/helpers'
import App from './App'

const { user_id } = decodeJwt()

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
        path: '/team-applied-jobs',
        component: <TeamAppliedJobs />,
        protect: true,
        title: 'Team Appllied Jobs',
    },
    {
        path: '/jobs-portal',
        component: <JobsFilter />,
        protect: true,
        title: 'Jobs Detail',
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
    {
        path: '/roles',
        component: <Roles />,
        protect: true,
        title: 'Roles Management',
    },
    {
        path: '/users',
        component: <Users />,
        protect: true,
        title: 'Users Management',
    },
    {
        path: '/user-applied-jobs',
        component: <AppliedJobs userId={user_id} />,
        protect: true,
        title: 'My Applied Jobs',
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
