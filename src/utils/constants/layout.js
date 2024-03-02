import {
    DashboardIcon,
    ReportIcon,
    Jobs,
    JobsUploaderIcon,
    TeamAppliedJobsIcon,
    ManagementIcon,
    UserIcon,
    CompaniesIcon,
    RolesIcon,
} from '@icons'

export const menuItems = [
    {
        label: 'Dashboard',
        link: '/',
        svg: DashboardIcon,
    },
    {
        label: 'Jobs',
        link: '#!',
        svg: ReportIcon,
        key: 'jobs',
        subItems: [
            {
                label: 'Applied Jobs',
                link: '/applied-jobs',
                svg: ReportIcon,
            },
            {
                label: 'Jobs Uploader',
                link: '/jobs-uploader',
                svg: JobsUploaderIcon,
            },
            {
                label: 'Team Applied Jobs',
                link: '/team-applied-jobs',
                svg: TeamAppliedJobsIcon,
            },
            {
                label: 'Jobs Portal',
                link: '/jobs-portal',
                svg: Jobs,
            },
        ],
    },
    {
        label: 'Management',
        link: '#!',
        svg: ManagementIcon,
        key: 'management',
        subItems: [
            {
                label: 'Users',
                link: '/users',
                svg: UserIcon,
            },
            {
                label: 'Companies',
                link: '/companies',
                svg: CompaniesIcon,
            },
            {
                label: 'Roles',
                link: '/roles',
                svg: RolesIcon,
            },
        ],
    },
]
