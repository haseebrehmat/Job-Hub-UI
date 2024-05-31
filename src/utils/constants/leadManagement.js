export const LEADS_INITIAL_VALS = {
    source: null,
    destination: null,
    show: false,
    page: 1,
    query: '',
    draggable: null,
    status: '',
    phase: '',
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
}

export const CANDIDATE_HEADS = [
    'Sr.',
    'Name',
    'Email',
    'Company',
    'Phone',
    'Experience (years)',
    'Total Leads',
    'Skills',
    'Designation',
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
        name: 'email',
        label: 'Email',
        type: 'email',
        ph: 'Enter email',
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
