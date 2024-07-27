export const LEADS_INITIAL_VALS = {
    source: null,
    destination: null,
    show: false,
    page: 1,
    draggable: null,
    status: '',
    phase: '',
    filter: false,
    query: '',
    from: '',
    to: '',
    team: '',
    members: [],
    stacks: [],
    candidates: [],
}

export const NOTE_INITIAL_STATE = {
    id: null,
    msg: '',
    edit: '',
    show: false,
    status: '',
    phase: '',
}

export const CANDIDATE_INITIAL_STATE = {
    query: '',
    page: 1,
    show: false,
    candidate: null,
    filter: false,
    skills: [],
    regions: [],
    companies: [],
    designations: '',
    from: '',
    to: '',
}

export const CANDIDATE_HEADS = [
    'Sr.',
    'Name',
    'Email',
    'Phone',
    'Experience (years)',
    'Total Leads',
    'Skills',
    'Designation',
    'Company',
    'Going to Leads',
    '',
]

export const CANDIDATE_INPUTS = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        ph: 'Enter name',
        required: true,
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        ph: 'Enter phone',
        required: true,
    },
    {
        name: 'experience',
        label: 'Years of experience',
        type: 'number',
        step: '0.5',
        ph: '',
        required: false,
    },
]

export const DESIGNATION_INITIAL_STATE = {
    query: '',
    page: 1,
    show: false,
    designation: null,
}

export const EXPOSED_CANDIDATE_HEADS = ['', 'Candidate', 'Skills', 'Designation', 'Exposed To']

export const EXPOSED_CANDIDATE_INITIAL_STATE = {
    query: '',
    show: false,
    ids: [],
    selectedCompanies: [],
}

export const CANDIDATE_SELECT_STATE = {
    query: '',
    page: 1,
    candidate_id: null,
    skills: '',
    designations: '',
    regions: '',
    show: false,
}

export const LEAD_HEADS = [
    'Sr.',
    'Title',
    'Company',
    'Applier',
    'Candidate',
    'Vertical',
    'Status',
    'Phase',
    'Created At',
    '',
]
