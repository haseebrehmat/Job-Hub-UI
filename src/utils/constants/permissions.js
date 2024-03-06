export const permissions = [
    {
        module: 'Dashboard',
        permissions: [
            {
                codename: 'view_dashboard',
                name: 'View Dashboard',
            },
            {
                codename: 'view_statistics',
                name: 'View Statistics',
            },
        ],
    },
    {
        module: 'User Management',
        permissions: [
            {
                codename: 'view_user',
                name: 'View Users',
            },
            {
                codename: 'create_user',
                name: 'Create User',
            },
            {
                codename: 'edit_user',
                name: 'Edit User',
            },
            {
                codename: 'delete_user',
                name: 'Delete User',
            },
            {
                codename: 'change_user_status',
                name: 'Change User Status',
            },
        ],
    },
    {
        module: 'Company Management',
        permissions: [
            {
                codename: 'view_company',
                name: 'View Companies',
            },
            {
                codename: 'create_company',
                name: 'Create Company',
            },
            {
                codename: 'edit_company',
                name: 'Edit Company',
            },
            {
                codename: 'delete_company',
                name: 'Delete Company',
            },
            {
                codename: 'change_company_status',
                name: 'Change Company Status',
            },
        ],
    },
    {
        module: 'Integration Management',
        permissions: [
            {
                codename: 'view_integration',
                name: 'View Integrations',
            },
            {
                codename: 'create_integration',
                name: 'Create Integration',
            },
            {
                codename: 'edit_integration',
                name: 'Edit Integration',
            },
            {
                codename: 'delete_integration',
                name: 'Delete Integration',
            },
        ],
    },
    {
        module: 'Role Management',
        permissions: [
            {
                codename: 'view_role',
                name: 'View Roles',
            },
            {
                codename: 'create_role',
                name: 'Create Role',
            },
            {
                codename: 'edit_role',
                name: 'Edit Role',
            },
            {
                codename: 'delete_role',
                name: 'Delete Role',
            },
        ],
    },
    {
        module: 'Jobs',
        permissions: [
            {
                codename: 'view_applied_job',
                name: 'View Applied Jobs',
            },
            {
                codename: 'view_team_applied_job',
                name: 'View Team Applied Jobs',
            },
            {
                codename: 'change_job_status',
                name: 'Change Job Status',
            },
            {
                codename: 'view_user_applied_job',
                name: 'View My Applied Jobs',
            },
            {
                codename: 'view_job_uploader',
                name: 'View Job Uploader',
            },
            {
                codename: 'upload_csv',
                name: 'Upload CSV',
            },
            {
                codename: 'apply_job',
                name: 'Apply Job',
            },
            {
                codename: 'view_job_portal',
                name: 'View Job Portal',
            },
        ],
    },
    {
        module: 'Team Management',
        permissions: [
            {
                codename: 'view_team',
                name: 'View Teams',
            },
            {
                codename: 'create_team',
                name: 'Create Team',
            },
            {
                codename: 'edit_team',
                name: 'Edit Team',
            },
            {
                codename: 'delete_team',
                name: 'Delete Team',
            },
        ],
    },
]