import { Status, CompanyStatus, Phases, Leads, Candidates, Designations, ExposedCandidates } from '@modules'

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
        permission: 'view_phase',
    },
    {
        path: '/leads',
        component: <Leads />,
        protect: true,
        title: 'My Leads',
        permission: 'view_lead',
    },
    {
        path: '/candidates',
        component: <Candidates />,
        protect: true,
        title: 'Candidates',
        permission: 'view_candidate',
    },
    {
        path: '/designations',
        component: <Designations />,
        protect: true,
        title: 'Designations',
        permission: 'view_designation',
    },
    {
        path: '/exposed-candidates',
        component: <ExposedCandidates />,
        protect: true,
        title: 'Exposed Candidates',
        permission: 'view_exposed_candidate',
    },
]
