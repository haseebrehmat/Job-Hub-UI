export const INTERVAL_TYPE_OPTIONS = [
    { label: 'Minutes', value: 'minutes' },
    { label: 'Hours', value: 'hours' },
    { label: 'Days', value: 'days' },
]

export const JOB_SOURCE_OPTIONS = [
    { label: 'Adzuna', value: 'adzuna' },
    { label: 'Dice', value: 'dice' },
    { label: 'Indeed', value: 'indeed' },
    { label: 'Glassdoor', value: 'glassdoor' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Simply Hired', value: 'simplyhired' },
    { label: 'Monster', value: 'monster' },
    { label: 'Zip Recruiter', value: 'ziprecruiter' },
    { label: 'Career Builder', value: 'careerbuilder' },
    { label: 'Other', value: 'other' },
]

export const JOB_TYPES_OPTIONS = [
    { label: 'Full Time Remote', value: 'Full Time Remote' },
    { label: 'Full Time on Site', value: 'Full Time on Site' },
    { label: 'Contract', value: 'Contract' },
]

export const JOB_SOURCES = {
    linkedin: 'Linkedin',
    careerbuilder: 'Career Builder',
    adzuna: 'Adzuna',
    dice: 'Dice',
    indeed: 'Indeed',
    ziprecruiter: 'Zip Recruiter',
    glassdoor: 'Glassdoor',
    monster: 'Monster',
    simplyhired: 'Simply Hired',
    other: 'Other',
    all: 'All',
}

export const SETTING_HEADS = ['ID', 'Source', 'Type', 'Setting', '']
export const JOB_SOURCE_LINK_HEADS = ['ID', 'Source', 'Links', '']
export const SCRAPER_STATUS_HEADS = ['ID', 'Source', 'Status']
