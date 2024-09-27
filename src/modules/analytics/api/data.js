export const rawStacksData = [
    {
        name: 'others dev',
        q1: 100250,
        q2: 10025,
        q3: 10020,
    },
    {
        name: 'others',
        q1: 91505,
        q2: 9155,
        q3: 905,
    },
    {
        name: 'java',
        q1: 23717,
        q2: 2317,
        q3: 717,
    },
    {
        name: 'c#/dot net',
        q1: 18177,
        q2: 187,
        q3: 1817,
    },
    {
        name: 'devops',
        q1: 17112,
        q2: 112,
        q3: 1712,
    },
    {
        name: 'database',
        q1: 11411,
        q2: 1111,
        q3: 111,
    },
    {
        name: 'qa',
        q1: 10330,
        q2: 130,
        q3: 1030,
    },
    {
        name: 'ui/ux',
        q1: 9982,
        q2: 982,
        q3: 92,
    },
    {
        name: 'data engineering/data engineer',
        q1: 6890,
        q2: 60,
        q3: 630,
    },
    {
        name: 'python',
        q1: 6293,
        q2: 693,
        q3: 629,
    },
    {
        name: 'salesforce',
        q1: 6291,
        q2: 6296,
        q3: 34299,
    },
    {
        name: 'javascript',
        q1: 6187,
        q2: 76187,
        q3: 96187,
    },
    {
        name: 'ios',
        q1: 4347,
        q2: 47,
        q3: 7,
    },
    {
        name: 'android',
        q1: 3493,
        q2: 0,
        q3: 0,
    },
    {
        name: 'service now',
        q1: 3183,
        q2: 0,
        q3: 0,
    },
    {
        name: 'c/c++',
        q1: 3085,
        q2: 30,
        q3: 385,
    },
    {
        name: 'mern',
        q1: 2459,
        q2: 2459,
        q3: 2459,
    },
    {
        name: 'data science/data scientist',
        q1: 2401,
        q2: 2401,
        q3: 2401,
    },
    {
        name: 'php',
        q1: 1918,
        q2: 1918,
        q3: 1918,
    },
    {
        name: 'dynamics',
        q1: 1906,
        q2: 1906,
        q3: 1906,
    },
    {
        name: 'networking',
        q1: 1841,
        q2: 1841,
        q3: 1841,
    },
    {
        name: 'go/golang',
        q1: 1535,
        q2: 1535,
        q3: 1535,
    },
    {
        name: 'react-js',
        q1: 1517,
        q2: 1517,
        q3: 1517,
    },
    {
        name: 'ml engineer',
        q1: 1462,
        q2: 1462,
        q3: 1462,
    },
    {
        name: 'ml enginner',
        q1: 982,
        q2: 982,
        q3: 982,
    },
    {
        name: 'ruby on rails',
        q1: 846,
        q2: 846,
        q3: 846,
    },
    {
        name: 'blockchain',
        q1: 805,
        q2: 805,
        q3: 805,
    },
    {
        name: 'react native',
        q1: 312,
        q2: 312,
        q3: 312,
    },
    {
        name: 'flutter',
        q1: 123,
        q2: 123,
        q3: 123,
    },
    {
        name: 'wordpress',
        q1: 17,
        q2: 17,
        q3: 17,
    },
    {
        name: 'full-stack',
        q1: 15,
        q2: 15,
        q3: 15,
    },
    {
        name: 'ror',
        q1: 15,
        q2: 15,
        q3: 15,
    },
    {
        name: 'full-stack .net',
        q1: 1,
        q2: 1,
        q3: 1,
    },
    {
        name: 'sdet',
        q1: 1,
        q2: 1,
        q3: 1,
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

export const quarterlyTrends = [
    { category: 'Full Stack', q1: 12000, q2: 12000, q3: 12000 },
    { category: 'Niche', q1: 12000, q2: 12000, q3: 12000 },
]

export const monthlyTrends = [
    { category: 'Full Stack', jan: 12000, feb: 12000, mar: 12000 },
    { category: 'Niche', jan: 12000, feb: 12000, mar: 12000 },
]
