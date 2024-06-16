export const rawStacksData = [
    {
        name: 'others dev',
        total: 100250,
    },
    {
        name: 'others',
        total: 91505,
    },
    {
        name: 'java',
        total: 23717,
    },
    {
        name: 'c#/dot net',
        total: 18177,
    },
    {
        name: 'devops',
        total: 17112,
    },
    {
        name: 'database',
        total: 11411,
    },
    {
        name: 'qa',
        total: 10330,
    },
    {
        name: 'ui/ux',
        total: 9982,
    },
    {
        name: 'data engineering/data engineer',
        total: 6890,
    },
    {
        name: 'python',
        total: 6293,
    },
    {
        name: 'salesforce',
        total: 6291,
    },
    {
        name: 'javascript',
        total: 6187,
    },
    {
        name: 'ios',
        total: 4347,
    },
    {
        name: 'android',
        total: 3493,
    },
    {
        name: 'service now',
        total: 3183,
    },
    {
        name: 'c/c++',
        total: 3085,
    },
    {
        name: 'mern',
        total: 2459,
    },
    {
        name: 'data science/data scientist',
        total: 2401,
    },
    {
        name: 'php',
        total: 1918,
    },
    {
        name: 'dynamics',
        total: 1906,
    },
    {
        name: 'networking',
        total: 1841,
    },
    {
        name: 'go/golang',
        total: 1535,
    },
    {
        name: 'react-js',
        total: 1517,
    },
    {
        name: 'ml engineer',
        total: 1462,
    },
    {
        name: 'ml enginner',
        total: 982,
    },
    {
        name: 'ruby on rails',
        total: 846,
    },
    {
        name: 'blockchain',
        total: 805,
    },
    {
        name: 'react native',
        total: 312,
    },
    {
        name: 'flutter',
        total: 123,
    },
    {
        name: 'wordpress',
        total: 17,
    },
    {
        name: 'full-stack',
        total: 15,
    },
    {
        name: 'ror',
        total: 15,
    },
    {
        name: 'full-stack .net',
        total: 1,
    },
    {
        name: 'sdet',
        total: 1,
    },
]

export const stacksData = rawStacksData.map(entry => ({
    name: entry.name,
    total: entry.total,
    contract_on_site: parseInt(entry.total / 7),
    contract_remote: parseInt(entry.total / 6),
    full_time_on_site: parseInt(entry.total / 5),
    full_time_remote: parseInt(entry.total / 4),
    hybrid_on_site: parseInt(entry.total / 3),
    hybrid_remote: parseInt(entry.total / 2),
}))

export const jobstypeData = [
    {
        name: 'Contract On Site',
        value: 100250,
        key: 'contract_on_site',
    },
    {
        name: 'Contract Remote',
        value: 1250,
        key: 'contract_remote',
    },
    {
        name: 'Full Time On Site',
        value: 91505,
        key: 'full_time_on_site',
    },
    {
        name: 'Full Time Remote',
        value: 23717,
        key: 'full_time_remote',
    },
    {
        name: 'Hybrid On Site',
        value: 18177,
        key: 'hybrid_on_site',
    },
    {
        name: 'Hybrid Remote',
        value: 1877,
        key: 'hybrid_remote',
    },
]

export const trendsData = [
    { date: 'Jan', jobs: 100 },
    { date: 'Feb', jobs: 120 },
    { date: 'Mar', jobs: 90 },
    { date: 'Apr', jobs: 80 },
    { date: 'May', jobs: 70 },
    { date: 'Jun', jobs: 200 },
    { date: 'Aug', jobs: 290 },
]
