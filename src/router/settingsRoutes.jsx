import { Integrations, Logger, ResumeBuilder, GenericSkills } from '@modules'

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
        permission: 'all',
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
]
