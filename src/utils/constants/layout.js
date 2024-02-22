import {
    DashboardIcon,
    ReportIcon,
    Jobs,
    JobsUploaderIcon,
    TeamAppliedJobsIcon,
    ManagementIcon,
    UserIcon,
    CompaniesIcon,
} from '@icons'
import { decodeJwt } from '@utils/helpers'

const user = decodeJwt()

const jobsSubItems = role => {
    switch (role) {
        case 'TL':
            return [
                {
                    label: 'Team Applied Jobs',
                    link: '/jobs',
                    svg: TeamAppliedJobsIcon,
                },
            ]
        case 'BD':
            return [
                {
                    label: 'Jobs Portal',
                    link: '/jobs-portal',
                    svg: Jobs,
                },
            ]
        default:
            return []
    }
}

export const menuItems = [
    {
        label: 'Dashboard',
        link: '/',
        svg: DashboardIcon,
    },
    {
        label: 'Jobs',
        link: '#!',
        svg: ReportIcon,
        key: 'jobs',
        subItems: [
            {
                label: 'Applied Jobs',
                link: '/applied-jobs',
                svg: ReportIcon,
            },
            {
                label: 'Jobs Uploader',
                link: '/jobs-uploader',
                svg: JobsUploaderIcon,
            },
            ...jobsSubItems(user.role),
        ],
    },
    {
        label: 'Management',
        link: '#!',
        svg: ManagementIcon,
        key: 'management',
        subItems: [
            {
                label: 'Users',
                link: '/applied-jobs',
                svg: UserIcon,
            },
            {
                label: 'Companies',
                link: '/jobs-uploader',
                svg: CompaniesIcon,
            },
        ],
    },
]
