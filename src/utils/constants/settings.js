export const integrations_head = ['#', 'Company', 'Integration', 'Status', '']
export const roleHeads = ['ID', 'Name', 'Description', 'Group', 'Code', '']
export const userHeads = ['ID', 'Email', 'Username', 'Role', 'Company', '']

export const apiStatus = {
    0: 'Enable',
    1: 'Disable',
}

export const integrationNames = [
    { value: 'chat gpt', label: 'Chat GPT' },
    { value: 'github', label: 'Github' },
    { value: 'google', label: 'Google Maps API' },
    { value: 'Twillio API', label: 'Twillio API' },
]

export const API_LOGS_HEADS = ['Sr.', 'Source', 'Created At', 'Total Jobs']

export const API_LOGS_INITIAL_VALUES = {
    query: '',
    page: 1,
    filter: false,
    from: '',
    to: '',
    sources: [],
}

export const REGIONS_INITIAL_VALUES = {
    query: '',
    page: 1,
    show: false,
    region: null,
}
