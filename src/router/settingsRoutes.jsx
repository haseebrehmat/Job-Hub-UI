import {
    Integrations,
    Logger,
    ResumeBuilder,
    GenericSkills,
    ApiLogs,
    Regions,
    Permissions,
    TechStacksCategories,
} from '@modules'

export const settingsRoutes = [
    {
        path: '/integrations',
        component: <Integrations />,
        protect: true,
        title: 'Integration Management',
        permission: 'view_integration',
    },
    {
        path: '/logger',
        component: <Logger />,
        protect: true,
        title: 'Logger',
        permission: 'view_logger',
    },
    {
        path: '/resume-builder',
        component: <ResumeBuilder />,
        protect: true,
        title: 'Resume Builder',
        permission: 'view_resume_builder',
    },
    {
        path: '/generic-skills',
        component: <GenericSkills />,
        protect: true,
        title: 'Generic Skills',
        permission: 'view_generic_skill',
    },
    {
        path: '/api-logs',
        component: <ApiLogs />,
        protect: true,
        title: 'API Logs (Sales Engine)',
        permission: 'view_api_logs',
    },
    {
        path: '/regions',
        component: <Regions />,
        protect: true,
        title: 'Regions',
        permission: 'view_region',
    },
    {
        path: '/permissions',
        component: <Permissions />,
        protect: true,
        title: 'Permissions',
        permission: 'view_permission',
    },
    {
        path: '/tech-stacks-categories',
        component: <TechStacksCategories />,
        protect: true,
        title: 'Tech Stacks Categories',
        permission: 'view_tech_stacks_categories',
    },
]
