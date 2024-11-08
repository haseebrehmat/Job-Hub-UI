export const JOB_TYPE_NUMBER_STYLE = {
    transition: '0.8s ease-out',
    fontSize: 30,
    transitionProperty: 'background-color, color, opacity',
}

export const TECH_STACK_NUMBER_STYLE = {
    transition: '0.8s ease-out',
    fontSize: 22,
    transitionProperty: 'background-color, color, opacity',
}

export const DEFAULT_FILTER_VALS = {
    week: '',
    month: '',
    year: '',
    quarter: '',
    from: '',
    to: '',
}

export const ANALYTIC_INITIAL_VALUES = {
    filter: false,
    query: '',
    percent: '',
    bar: 'total',
    stack: 'others dev',
    excluded: [],
    ...DEFAULT_FILTER_VALS,
}

export const JOB_TYPE_COLORS = ['#532747', '#1c5655', '#526acb', '#644897', '#8e272b', '#2d455c', '#4ab9a7']

export const JOB_TYPES = {
    contract_on_site: 'Contract On Site',
    contract_remote: 'Contract Remote',
    full_time_on_site: 'Full Time On Site',
    full_time_remote: 'Full Time Remote',
    hybrid_full_time: 'Hybrid Full Time',
    hybrid_contract: 'Hybrid Contract',
    total: 'Total',
}

export const JOB_TYPE_COLORS2 = {
    contract_on_site: '#644897',
    contract_remote: '#2d455c',
    full_time_on_site: '#526acb',
    full_time_remote: '#532747',
    hybrid_full_time: '#8e272b',
    hybrid_contract: '#1c5655',
    total: '#4ab9a7',
}

export const GRAPHS_DIVS_IDS = [
    'job-type-counts',
    'job-type-pies',
    'tech-stack-counts',
    'tech-stack-pies',
    'tech-stack-bars',
    'jobs-trends-chart',
    'tech-stack-category-trends-bars',
]
