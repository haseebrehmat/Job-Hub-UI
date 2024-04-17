import { Navigate } from 'react-router-dom'

import {
    AppliedJobs,
    Login,
    TeamAppliedJobs,
    // JobSourceBlocking,
    JobsFilter,
    JobsUploader,
    ForgetPassword,
    ResetPassword,
    Companies,
    Roles,
    Users,
    Integrations,
    Teams,
    Team,
    Profile,
    CoverLetter,
    Scrapper,
    Logger,
    ResumeBuilder,
    Pseudos,
    Vertical,
} from '@modules'

import { JobDetail } from '@modules/jobsFilter/components'

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
    {
        path: '/team-applied-jobs',
        component: <TeamAppliedJobs />,
        protect: true,
        title: 'Team Appllied Jobs',
        permission: 'view_team_applied_job',
    },
    {
        path: '/jobs-portal',
        component: <JobsFilter />,
        protect: true,
        title: 'Jobs Portal',
        permission: 'view_job_portal',
    },
    {
        path: '/job-details',
        component: <JobDetail />,
        protect: true,
        title: 'Job Details',
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
    // {
    //     path: '/job-source-blocking',
    //     component: <JobSourceBlocking />,
    //     protect: true,
    //     title: 'Job Source Blocking',
    // },
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
    {
        path: '/profile',
        component: <Profile />,
        protect: true,
        title: 'Profile',
        permission: 'all',
    },
    {
        path: '/coverletter',
        component: <CoverLetter />,
        protect: true,
        title: 'Cover Letter',
        permission: 'all',
    },
    {
        path: '/job-scrapper',
        component: <Scrapper />,
        protect: true,
        title: 'Job Scrapper',
        permission: 'view_job_scrapper',
    },
    {
        path: '/logger',
        component: <Logger />,
        protect: true,
        title: 'Logger',
        permission: 'all',
    },
    {
        path: '/resume-builder',
        component: <ResumeBuilder />,
        protect: true,
        title: 'Resume Builder',
        permission: 'all',
    },
    {
        path: '/pseudos',
        component: <Pseudos />,
        protect: true,
        title: 'Pseudos',
        permission: 'all',
    },
    {
        path: '/vertical/:id',
        component: <Vertical />,
        protect: true,
        title: 'Veritcals',
    },
    {
        path: '/team-details',
        component: <Team />,
        protect: true,
        title: 'Team Management',
        permission: 'view_member_team',
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
