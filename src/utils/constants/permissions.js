import { isSuper } from '@utils/helpers'

export const rawpermissions = [
    {
        module: 'Dashboard',
        permissions: [
            {
                codename: 'view_dashboard',
                name: 'View Dashboard',
                child: ['view_statistics'],
                level: 2,
            },
            {
                codename: 'view_statistics',
                name: 'View Statistics',
                parent: ['view_dashboard'],
                level: 2,
            },
        ],
    },
    {
        module: 'User Management',
        permissions: [
            {
                codename: 'view_user',
                name: 'View Users',
                child: ['create_user', 'view_user', 'edit_user', 'delete_user', 'change_user_status'],
                level: 2,
            },
            {
                codename: 'create_user',
                name: 'Create User',
                parent: ['view_user'],
                level: 2,
            },
            {
                codename: 'edit_user',
                name: 'Edit User',
                parent: ['view_user'],
                level: 2,
            },
            {
                codename: 'delete_user',
                name: 'Delete User',
                parent: ['view_user'],
                level: 2,
            },
            {
                codename: 'change_user_status',
                name: 'Change User Status',
                parent: ['view_user'],
                level: 2,
            },
        ],
    },
    {
        module: 'Company Management',
        permissions: [
            {
                codename: 'view_company',
                name: 'View Companies',
                child: ['create_company', 'view_company', 'edit_company', 'delete_company', 'change_company_status'],
                level: 1,
            },
            {
                codename: 'create_company',
                name: 'Create Company',
                parent: ['view_company'],
                level: 1,
            },
            {
                codename: 'edit_company',
                name: 'Edit Company',
                parent: ['view_company'],
                level: 1,
            },
            {
                codename: 'delete_company',
                name: 'Delete Company',
                parent: ['view_company'],
                level: 1,
            },
            {
                codename: 'change_company_status',
                name: 'Change Company Status',
                parent: ['view_company'],
                level: 1,
            },
        ],
    },
    {
        module: 'Integration Management',
        permissions: [
            {
                codename: 'view_integration',
                name: 'View Integrations',
                child: ['create_integration', 'view_integration', 'edit_integration', 'delete_integration'],
                level: 2,
            },
            {
                codename: 'create_integration',
                name: 'Create Integration',
                parent: ['view_integration'],
                level: 2,
            },
            {
                codename: 'edit_integration',
                name: 'Edit Integration',
                parent: ['view_integration'],
                level: 2,
            },
            {
                codename: 'delete_integration',
                name: 'Delete Integration',
                parent: ['view_integration'],
                level: 2,
            },
        ],
    },
    {
        module: 'Role Management',
        permissions: [
            {
                codename: 'view_role',
                name: 'View Roles',
                child: ['create_role', 'view_role', 'edit_role', 'delete_role'],
                level: 2,
            },
            {
                codename: 'create_role',
                name: 'Create Role',
                parent: ['view_role'],
                level: 2,
            },
            {
                codename: 'edit_role',
                name: 'Edit Role',
                parent: ['view_role'],
                level: 2,
            },
            {
                codename: 'delete_role',
                name: 'Delete Role',
                parent: ['view_role'],
                level: 2,
            },
        ],
    },
    {
        module: 'Jobs',
        permissions: [
            {
                codename: 'view_applied_job',
                name: 'View Applied Jobs',
                level: 2,
            },
            {
                codename: 'view_team_applied_job',
                name: 'View Team Applied Jobs',
                child: ['change_job_status'],
                level: 2,
            },
            {
                codename: 'change_job_status',
                name: 'Change Job Status',
                parent: ['view_team_applied_job'],
                level: 2,
            },
            {
                codename: 'view_user_applied_job',
                name: 'View My Applied Jobs',
                level: 2,
            },
            {
                codename: 'view_job_uploader',
                name: 'View Job Uploader',
                child: ['upload_csv'],
                level: 2,
            },
            {
                codename: 'upload_csv',
                name: 'Upload CSV',
                parent: ['view_job_uploader'],
                level: 2,
            },
            {
                codename: 'view_job_portal',
                name: 'View Job Portal',
                child: ['apply_job'],
                level: 2,
            },
            {
                codename: 'apply_job',
                name: 'Apply Job',
                parent: ['view_job_portal'],
                level: 2,
            },
            {
                codename: 'view_cover_letter',
                name: 'View Cover Letter',
                parent: ['view_cover_letter'],
            },
            {
                codename: 'create_cover_letter',
                name: 'Create Cover Letter',
                parent: ['create_cover_letter'],
            },
            {
                codename: 'view_job_scrapper',
                name: 'View Job Scrapper',
                child: ['create_cronjob_setting', 'edit_cronjob_setting', 'delete_cronjob_setting', 'run_scrapper'],
                level: 1,
            },
            {
                codename: 'create_cronjob_setting',
                name: 'Create Cronjob Setting',
                parent: ['view_job_scrapper'],
                level: 1,
            },
            {
                codename: 'edit_cronjob_setting',
                name: 'Edit Cronjob Setting',
                parent: ['view_job_scrapper'],
                level: 1,
            },
            {
                codename: 'delete_cronjob_setting',
                name: 'Delete Cronjob Setting',
                parent: ['view_job_scrapper'],
                level: 1,
            },
            {
                codename: 'run_scrapper',
                name: 'Run Scrapper',
                parent: ['view_job_scrapper'],
                level: 1,
            },
        ],
    },
    {
        module: 'Team Management',
        permissions: [
            {
                codename: 'view_team',
                name: 'View Teams',
                child: ['create_team', 'view_team', 'edit_team', 'delete_team'],
                level: 2,
            },
            {
                codename: 'create_team',
                name: 'Create Team',
                parent: ['view_team'],
                level: 2,
            },
            {
                codename: 'edit_team',
                name: 'Edit Team',
                parent: ['view_team'],
                level: 2,
            },
            {
                codename: 'delete_team',
                name: 'Delete Team',
                parent: ['view_team'],
                level: 2,
            },
        ],
    },
]

export const permissions = rawpermissions.map(row => ({
    module: row.module,
    permissions: row?.permissions.filter(p => {
        if (isSuper()) return p.level >= 1
        return p.level >= 2
    }),
}))
