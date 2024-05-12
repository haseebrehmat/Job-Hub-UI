import { Status, CompanyStatus, Phases } from '@modules'

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
        title: 'Status',
        permission: 'view_company_status',
    },
    {
        path: '/phases',
        component: <Phases />,
        protect: true,
        title: 'Phases',
        permission: 'all',
    },
]
