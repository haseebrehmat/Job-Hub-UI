import { Status } from '@modules'

export const leadsRoutes = [
    {
        path: '/status',
        component: <Status />,
        protect: true,
        title: 'All Statuses',
        permission: 'view_status',
    },
]
