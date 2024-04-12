export const PSEUDO_HEADS = ['ID', 'Name', 'Verticals', '']

export const VERTICAL_SECTIONS = {
    basic: 'Basic Info',
    skill: 'Skill Set',
    experience: 'Experience',
    education: 'Eduction History',
    language: 'Languages',
    link: 'Social Links',
    other: 'Other Sections',
}

export const VERTICAL_INITIAL_TABS = {
    basic: true,
    skill: false,
    experience: false,
    education: false,
    language: false,
    link: false,
    other: false,
}

export const BASIC_INFO_INPUTS = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        ph: 'Enter vertical name',
    },
    {
        name: 'designation',
        label: 'Designation',
        type: 'text',
        ph: 'Enter vertical designation',
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

export const PROFICIENCY_LEVELS = {
    1: 'Beginner',
    2: 'Elementary',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert',
}

export const SOCIAL_PLATFORM_OPTIONS = [
    { label: 'Linkedin', value: 'linkedin' },
    { label: 'Facebook', value: 'facebook' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'Behance', value: 'behance' },
    { label: 'Github', value: 'github' },
    { label: 'Twitter', value: 'twitter' },
    { label: 'Other', value: 'other' },
]

export const SOCIAL_PLATFORMS = {
    linkedin: 'LinkedIn',
    facebook: 'Facebook',
    instagram: 'Instagram',
    behance: 'Behance',
    github: 'Github',
    twitter: 'Twitter',
    other: 'Other',
}
