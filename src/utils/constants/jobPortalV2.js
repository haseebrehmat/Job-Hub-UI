export const ORDER_BY_OPTIONS = {
    '-job_posted_date': 'Posted Date',
    job_title: 'Job Title',
    company: 'Companies',
    job_type: 'Job Type',
}

export const VISIBILITY_OPTIONS = {
    all: 'All',
    recruiter: 'Recruiter',
    'non-recruiter': 'Non-Recruiter',
}

export const FILTERS_DEFAULT_VALUES = {
    from: '',
    to: '',
    order: '-job_posted_date',
    visible: 'all',
    techs: [],
    sources: [],
    types: [],
    blocked: false,
}
