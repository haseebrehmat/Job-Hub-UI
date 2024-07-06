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
    bar: 'total',
    stack: 'others dev',
    ...DEFAULT_FILTER_VALS,
}

export const JOB_TYPE_COLORS = ['#532747', '#1c5655', '#526acb', '#644897', '#8e272b', '#2d455c', '#4ab9a7']

export const JOB_TYPES = {
    contract_on_site: 'Contract On Site',
    contract_remote: 'Contract Remote',
    full_time_on_site: 'Full Time On Site',
    full_time_remote: 'Full Time Remote',
    hybrid_on_site: 'Hybrid On Site',
    hybrid_remote: 'Hybrid Remote',
}

export const JOB_TYPE_COLORS2 = {
    contract_on_site: '#532747',
    contract_remote: '#1c5655',
    full_time_on_site: '#526acb',
    full_time_remote: '#644897',
    hybrid_on_site: '#8e272b',
    hybrid_remote: '#2d455c',
}
