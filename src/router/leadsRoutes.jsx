import { Status, CompanyStatus } from '@modules'

export const leadsRoutes = [
    {
        path: '/status',
        component: <Status />,
        protect: true,
        title: 'All Statuses',
        permission: 'view_status',
    },
    {
        path: '/company-status',
        component: <CompanyStatus />,
        protect: true,
        title: 'Statuses',
        permission: 'view_company_status',
    },
]
