export const comapnyHeads = ['ID', 'Name', 'Company Code', 'Status', '']
export const roleHeads = ['ID', 'Name', 'Permissions', '']
export const userHeads = ['ID', 'Email', 'Username', 'Role', 'Company', '']
export const teamHeads = ['ID', 'Name', 'Reporting', 'Members', '']
export const PSEUDO_HEADS = ['ID', 'Name', 'Verticals', '']

export const comapnyStatus = {
    0: 'Enable',
    1: 'Disable',
}

export const blockedSourceHeads = ['ID', 'Job Source', '']

export const VERTICAL_SECTIONS = {
    basic: 'Basic Info',
    skill: 'Skill Set',
    experience: 'Experience',
    education: 'Eduction History',
    hobby: 'Hobbies',
    language: 'Languages',
    summary: 'Summary',
}

export const VERTICAL_INITIAL_TABS = {
    basic: true,
    skill: false,
    experience: false,
    education: false,
    hobby: false,
    language: false,
    summary: false,
}

export const BASIC_INFO_INPUTS = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        ph: 'Enter vertical name',
    },
    {
        name: 'title',
        label: 'Title',
        type: 'text',
        ph: 'Enter vertical title',
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        ph: 'Enter vertical email',
    },
    {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        ph: 'Enter vertical phone',
    },
    {
        name: 'portfolio',
        label: 'Portfolio website',
        type: 'url',
        ph: 'Enter vertical portfolio website',
    },
]
