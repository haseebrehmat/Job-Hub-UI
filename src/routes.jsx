import { Navigate } from 'react-router-dom'

import {
    AppliedJobs,
    Login,
    JobsFilter,
    JobsUploader,
    ForgetPassword,
    ResetPassword,
    Companies,
    Roles,
    Users,
    Integrations,
    Teams,
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
        permission: 'all',
    },
    // {
    //     path: '/applied-jobs',
    //     component: <AppliedJobs />,
    //     protect: true,
    //     title: 'Applied Jobs',
    //     permission: 'view_applied_job',
    // },
    // {
    //     path: '/team-applied-jobs',
    //     component: <TeamAppliedJobs />,
    //     protect: true,
    //     title: 'Team Appllied Jobs',
    //     permission: 'view_team_applied_job',
    // },
    {
        path: '/jobs-portal',
        component: <JobsFilter />,
        protect: true,
        title: 'Jobs Portal',
        permission: 'view_job_portal',
    },
    {
        path: '/jobs-uploader',
        component: <JobsUploader />,
        protect: true,
        title: 'Job Uploader',
        permission: 'view_job_uploader',
    },
    {
        path: '/companies',
        component: <Companies />,
        protect: true,
        title: 'Companies Management',
        permission: 'view_company',
    },
    {
        path: '/roles',
        component: <Roles />,
        protect: true,
        title: 'Roles Management',
        permission: 'view_role',
    },
    {
        path: '/users',
        component: <Users />,
        protect: true,
        title: 'Users Management',
        permission: 'view_user',
    },
    {
        path: '/teams',
        component: <Teams />,
        protect: true,
        title: 'Teams Management',
        permission: 'view_team',
    },
    {
        path: '/integrations',
        component: <Integrations />,
        protect: true,
        title: 'Integration Management',
        permission: 'view_integration',
    },
    {
        path: '/user-applied-jobs',
        component: <AppliedJobs userId={user_id} />,
        protect: true,
        title: 'My Applied Jobs',
        permission: 'view_user_applied_job',
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
