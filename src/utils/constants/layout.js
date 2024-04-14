import {
    DashboardIcon,
    ReportIcon,
    Jobs,
    JobsUploaderIcon,
    ManagementIcon,
    UserIcon,
    CompaniesIcon,
    RolesIcon,
    SettingIcon,
    IntegrationIcon,
    UserAppliedJobIcon,
    TeamAppliedJobsIcon,
    TeamsIcon,
    CoverLetter,
    ScrapperIcon,
    LoggerIcon,
    ResumeIcon,
    PseudoIcon,
} from '@icons'

export const menuItems = [
    {
        label: 'Dashboard',
        link: '/',
        svg: DashboardIcon,
        perms: ['view_dashboard', 'view_statistics'],
    },
    {
        label: 'Jobs',
        link: '#!',
        svg: ReportIcon,
        key: 'jobs',
        perms: [
            'view_applied_job',
            'view_user_applied_job',
            'view_job_uploader',
            'view_team_applied_job',
            'change_job_status',
            'upload_csv',
            'view_job_portal',
            'view_cover_letter',
            'create_cover_letter',
            'generate_cover_letter',
            'view_job_scrapper',
            'create_cronjob_setting',
            'edit_cronjob_setting',
            'delete_cronjob_setting',
            'run_scrapper',
        ],
        subItems: [
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
                perms: ['view_job_uploader', 'upload_csv', 'create_manual_job', 'view_manual_job'],
            },
            {
                label: 'Team Applied Jobs',
                link: '/team-applied-jobs',
                svg: TeamAppliedJobsIcon,
                perms: ['view_team_applied_job', 'change_job_status'],
            },
            {
                label: 'Jobs Portal',
                link: '/jobs-portal',
                svg: Jobs,
                perms: ['view_job_portal', 'apply_job'],
            },
            {
                label: 'Cover Letter',
                link: '/coverletter',
                svg: CoverLetter,
                perms: ['view_cover_letter', 'create_cover_letter'],
            },
            {
                label: 'Job Scrapper',
                link: '/job-scrapper',
                svg: ScrapperIcon,
                perms: [
                    'view_job_scrapper',
                    'create_cronjob_setting',
                    'edit_cronjob_setting',
                    'delete_cronjob_setting',
                    'run_scrapper',
                    'create_job_source_link',
                    'edit_job_source_link',
                    'delete_job_source_link',
                ],
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
            'view_team',
            'create_user',
            'create_role',
            'create_company',
            'create_team',
            'edit_user',
            'edit_role',
            'edit_company',
            'edit_team',
            'view_pseudo',
            'create_pseudo',
            'edit_pseudo',
            'create_vertical',
            'edit_vertical',
        ],
        subItems: [
            {
                label: 'Users',
                link: '/users',
                svg: UserIcon,
                perms: ['view_user', 'create_user', 'edit_user'],
            },
            {
                label: 'Companies',
                link: '/companies',
                svg: CompaniesIcon,
                perms: ['view_company', 'create_company', 'edit_company'],
            },
            {
                label: 'Roles',
                link: '/roles',
                svg: RolesIcon,
                perms: ['view_role', 'create_role', 'edit_role'],
            },
            {
                label: 'Teams',
                link: '/teams',
                svg: TeamsIcon,
                perms: ['view_team', 'create_team', 'edit_team'],
            },
            {
                label: 'Pseudos',
                link: '/pseudos',
                svg: PseudoIcon,
                perms: [
                    'view_pseudo',
                    'create_pseudo',
                    'edit_pseudo',
                    'delete_pseudo',
                    'create_vertical',
                    'edit_vertical',
                    'delete_vertical',
                ],
            },
        ],
    },
    {
        label: 'Settings',
        link: '#!',
        svg: SettingIcon,
        key: 'settings',
        perms: ['view_integration', 'create_integration', 'edit_integration'],
        subItems: [
            {
                label: 'Integrations',
                link: '/integrations',
                svg: IntegrationIcon,
                perms: ['view_integration', 'create_integration', 'edit_integration'],
            },
            {
                label: 'Resume Builder',
                link: '/resume-builder',
                svg: ResumeIcon,
                perms: ['view_integration', 'create_integration', 'edit_integration'],
            },
        ],
    },
    {
        label: 'Logger',
        link: '/logger',
        svg: LoggerIcon,
        perms: ['view_logger', 'show_log_details'],
    },
]
