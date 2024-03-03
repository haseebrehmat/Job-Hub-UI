export default [
    {
        module: 'User Management',
        permissions: [
            {
                codename: 'can_view_user',
                name: 'View User',
            },
            {
                codename: 'can_create_user',
                name: 'Create User',
            },
            {
                codename: 'can_update_user',
                name: 'Edit User',
            },
            {
                codename: 'delete_user',
                name: 'Delete User',
            },
        ],
    },
    {
        module: 'Company Management',
        permissions: [
            {
                codename: 'view_company',
                name: 'View Company',
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
        ],
    },
    {
        module: 'Role Management',
        permissions: [
            {
                codename: 'view_role',
                name: 'View Role',
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
        module: 'Applied Jobs',
        permissions: [
            {
                codename: 'view_applied_job',
                name: 'View Applied Job',
            },
            {
                codename: 'can_view_team_applied_job',
                name: 'View Team Applied Job',
            },
        ],
    },
    {
        module: 'Job Uploader',
        permissions: [
            {
                codename: 'view_job_uploader',
                name: 'View Job Uploader',
            },
            {
                codename: 'upload_csv',
                name: 'Upload CSV',
            },
        ],
    },
    {
        module: 'Job Portal',
        permissions: [
            {
                codename: 'can_view_jobdetail',
                name: 'View Job Portal',
            },
            {
                codename: 'change_job_status',
                name: 'Change Job Status',
            },
        ],
    },
]
