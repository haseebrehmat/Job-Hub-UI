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
        perms: ['can_view_dashboard'],
    },
    {
        label: 'Jobs',
        link: '#!',
        svg: ReportIcon,
        key: 'jobs',
        perms: [
            'can_view_applied_job',
            'can_view_job_portal',
            'can_view_job_uploader',
            'can_view_team_applied_job',
            'can_update_job_status',
        ],
        subItems: [
            {
                label: 'Applied Jobs',
                link: '/applied-jobs',
                svg: ReportIcon,
                perms: ['can_view_applied_job'],
            },
            {
                label: 'My Applied Jobs',
                link: '/user-applied-jobs',
                svg: UserAppliedJobIcon,
                perms: ['can_view_user_applied_job'],
            },
            {
                label: 'Jobs Uploader',
                link: '/jobs-uploader',
                svg: JobsUploaderIcon,
                perms: ['can_view_job_uploader'],
            },
            {
                label: 'Team Applied Jobs',
                link: '/jobs',
                svg: TeamAppliedJobsIcon,
                perms: ['can_view_team_applied_job', 'can_update_job_status'],
            },
            {
                label: 'Jobs Portal',
                link: '/jobs-portal',
                svg: Jobs,
                perms: ['can_view_job_portal', 'can_update_job_status'],
            },
        ],
    },
    {
        label: 'Management',
        link: '#!',
        svg: ManagementIcon,
        key: 'management',
        perms: [
            'can_view_user',
            'can_view_role',
            'can_view_company',
            'can_create_user',
            'can_create_role',
            'can_create_company',
            'can_update_user',
            'can_update_role',
            'can_update_company',
        ],
        subItems: [
            {
                label: 'Users',
                link: '/users',
                svg: UserIcon,
                perms: ['can_view_user', 'can_create_user', 'can_update_user'],
            },
            {
                label: 'Companies',
                link: '/companies',
                svg: CompaniesIcon,
                perms: ['can_view_company', 'can_create_company', 'can_update_company'],
            },
            {
                label: 'Roles',
                link: '/roles',
                svg: RolesIcon,
                perms: ['can_view_role', 'can_create_role', 'can_update_role'],
            },
        ],
    },
]
