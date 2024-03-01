export default [
    {
        module: 'User Management',
        permissions: [
            {
                id: 1,
                codename: 'view_user',
                name: 'View User',
            },
            {
                id: 2,
                codename: 'create_user',
                name: 'Create User',
            },
            {
                id: 3,
                codename: 'edit_user',
                name: 'Edit User',
            },
            {
                id: 4,
                codename: 'delete_user',
                name: 'Delete User',
            },
        ],
    },
    {
        module: 'Company Management',
        permissions: [
            {
                id: 5,
                codename: 'view_company',
                name: 'View Company',
            },
            {
                id: 6,
                codename: 'create_company',
                name: 'Create Company',
            },
            {
                id: 7,
                codename: 'edit_company',
                name: 'Edit Company',
            },
            {
                id: 8,
                codename: 'delete_company',
                name: 'Delete Company',
            },
        ],
    },
    {
        module: 'Role Management',
        permissions: [
            {
                id: 9,
                codename: 'view_role',
                name: 'View Role',
            },
            {
                id: 10,
                codename: 'create_role',
                name: 'Create Role',
            },
            {
                id: 11,
                codename: 'edit_role',
                name: 'Edit Role',
            },
            {
                id: 12,
                codename: 'delete_role',
                name: 'Delete Role',
            },
        ],
    },
    {
        module: 'Applied Jobs',
        permissions: [
            {
                id: 13,
                codename: 'view_applied_job',
                name: 'View Applied Job',
            },
        ],
    },
    {
        module: 'Job Uploader',
        permissions: [
            {
                id: 14,
                codename: 'view_job_uploader',
                name: 'View Job Uploader',
            },
            {
                id: 15,
                codename: 'upload_csv',
                name: 'Upload CSV',
            },
        ],
    },
    {
        module: 'Job Portal',
        permissions: [
            {
                codename: 'view_job_portal',
                name: 'View Job Portal',
            },
            {
                codename: 'change_job_status',
                name: 'Change Job Status',
            },
        ],
    },
]
