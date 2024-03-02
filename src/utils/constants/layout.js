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
    UserAppliedJobIcon,
} from '@icons'

export const menuItems = [
    {
        label: 'Dashboard',
        link: '/',
        svg: DashboardIcon,
        perms: ['view_dashboard'],
    },
    {
        label: 'Jobs',
        link: '#!',
        svg: ReportIcon,
        key: 'jobs',
        perms: [
            'view_applied_job',
            'view_jobdetail',
            'view_job_uploader',
            'view_team_applied_job',
            'update_job_status',
        ],
        subItems: [
            {
                label: 'Applied Jobs',
                link: '/applied-jobs',
                svg: ReportIcon,
                perms: ['view_applied_job'],
            },
            {
                label: 'My Applied Jobs',
                link: '/user-applied-jobs',
                svg: UserAppliedJobIcon,
                perms: ['view_user_applied_job'],
            },
            {
                label: 'Jobs Uploader',
                link: '/jobs-uploader',
                svg: JobsUploaderIcon,
                perms: ['view_job_uploader'],
            },
            {
                label: 'Team Applied Jobs',
                link: '/team-applied-jobs',
                svg: TeamAppliedJobsIcon,
                perms: ['view_team_applied_job', 'update_job_status'],
            },
            {
                label: 'Jobs Detail',
                link: '/jobs-portal',
                svg: Jobs,
                perms: ['view_jobdetail', 'update_job_status'],
            },
        ],
    },
    {
        label: 'Management',
        link: '#!',
        svg: ManagementIcon,
        key: 'management',
        perms: [
            'view_user',
            'view_role',
            'view_company',
            'create_user',
            'create_role',
            'create_company',
            'update_user',
            'update_role',
            'update_company',
        ],
        subItems: [
            {
                label: 'Users',
                link: '/users',
                svg: UserIcon,
                perms: ['view_user', 'create_user', 'update_user'],
            },
            {
                label: 'Companies',
                link: '/companies',
                svg: CompaniesIcon,
                perms: ['view_company', 'create_company', 'update_company'],
            },
            {
                label: 'Roles',
                link: '/roles',
                svg: RolesIcon,
                perms: ['view_role', 'create_role', 'update_role'],
            },
        ],
    },
]
