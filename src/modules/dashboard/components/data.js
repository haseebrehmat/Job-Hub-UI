import { Cold, Hired, Prospect, Rejected, Total, Warm, Hot } from '@svgs'

export const dumyLeads = Array.from({ length: 20 }, (_, x) => ({
    name: `User-${x + 1}`,
    total: Math.floor(Math.random() * 300) + 600,
    prospects: Math.floor(Math.random() * 600) + 1,
    warm: Math.floor(Math.random() * 600) + 1,
    hot: Math.floor(Math.random() * 600) + 1,
    cold: Math.floor(Math.random() * 600) + 1,
    hired: Math.floor(Math.random() * 600) + 1,
    rejected: Math.floor(Math.random() * 600) + 1,
}))

export const dumyTechs = [
    {
        techStacks: 'MEAN',
        Jobs: 120,
    },
    {
        techStacks: 'MERN',
        Jobs: 98,
    },
    {
        techStacks: 'Python',
        Jobs: 86,
    },
    {
        techStacks: 'Django',
        Jobs: 99,
    },
    {
        techStacks: 'ROR',
        Jobs: 85,
    },
    {
        techStacks: 'Android',
        Jobs: 65,
    },
    {
        techStacks: 'Kotlin',
        Jobs: 120,
    },
    {
        techStacks: 'JAVA',
        Jobs: 98,
    },
    {
        techStacks: 'Flutter',
        Jobs: 86,
    },
    {
        techStacks: 'DevOps',
        Jobs: 99,
    },
    {
        techStacks: 'React',
        Jobs: 85,
    },
    {
        techStacks: 'Native',
        Jobs: 65,
    },
]

export const dumyStats = [
    {
        label: 'Total',
        value: 1000,
        icon: Total,
    },
    {
        label: 'Prospect',
        value: 230,
        icon: Prospect,
    },
    {
        label: 'Cold',
        value: 100,
        icon: Cold,
    },
    {
        label: 'Warm',
        value: 400,
        icon: Warm,
    },
    {
        label: 'Hot',
        value: 10,
        icon: Hot,
    },
    {
        label: 'Rejected',
        value: 90,
        icon: Rejected,
    },
    {
        label: 'Hired',
        value: 10,
        icon: Hired,
    },
]
