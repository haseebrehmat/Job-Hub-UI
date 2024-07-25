export const INTERVAL_TYPE_OPTIONS = [
    { label: 'Minutes', value: 'minutes' },
    { label: 'Hours', value: 'hours' },
    { label: 'Days', value: 'days' },
]

export const JOB_SOURCES_SINGLES = [
    { label: 'Adzuna', value: 'adzuna' },
    { label: 'Dice', value: 'dice' },
    { label: 'Indeed', value: 'indeed' },
    { label: 'Glassdoor', value: 'glassdoor' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Monster', value: 'monster' },
    { label: 'Talent', value: 'talent' },
    { label: 'Jooble', value: 'jooble' },
    { label: 'Careerjet', value: 'careerjet' },
    { label: 'Daily Remote', value: 'dailyremote' },
    { label: 'Recruit', value: 'recruit' },
    { label: 'Other', value: 'other' },
]

export const JOB_SOURCE_OPTIONS = [
    { label: 'Simply Hired', value: 'simplyhired' },
    { label: 'Zip Recruiter', value: 'ziprecruiter' },
    { label: 'Career Builder', value: 'careerbuilder' },
    { label: 'Google Careers', value: 'googlecareers' },
    ...JOB_SOURCES_SINGLES,
]

export const JOB_SOURCE_OPTIONS_UNDERSCORE = [
    { label: 'Simply Hired', value: 'simply_hired' },
    { label: 'Zip Recruiter', value: 'zip_recruiter' },
    { label: 'Career Builder', value: 'career_builder' },
    { label: 'Google Careers', value: 'google_careers' },
    ...JOB_SOURCES_SINGLES,
]

export const JOB_TYPES_OPTIONS = [
    { label: 'Full Time Remote', value: 'Full Time Remote' },
    { label: 'Full Time on Site', value: 'Full Time on Site' },
    { label: 'Hybrid Full Time', value: 'Hybrid Full Time' },
    { label: 'Hybrid Contract', value: 'Hybrid Contract' },
    { label: 'Contract Onsite', value: 'Contract Onsite' },
    { label: 'Contract Remote', value: 'Contract Remote' },
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
    googlecareers: 'Google Careers',
    jooble: 'Jooble',
    careerjet: 'Careerjet',
    talent: 'Talent',
    recruit: 'Recruit',
    simplyhired: 'Simply Hired',
    other: 'Other',
    all: 'All',
    // WITH UNDERSCORE
    career_builder: 'Career Builder',
    zip_recruiter: 'Zip Recruiter',
    simply_hired: 'Simply Hired',
    google_careers: 'Google Careers',
    dailyremote: 'DailyRemote',
}

export const SETTING_HEADS = ['ID', 'Source', 'Type', 'Setting', '']
export const GROUP_SETTING_HEADS = ['ID', 'Source', 'Type', 'Setting', 'Days', '']
export const LOGS_HEADS = ['ID', 'Source', 'Total jobs', 'Uploaded jobs', 'Created_at', 'Updated_at']
export const JOB_SOURCE_LINK_HEADS = ['ID', 'Source', 'Links', '']
export const SCRAPER_STATUS_HEADS = ['ID', 'Source', 'Type', 'Status']
export const SCRAPER_GROUP_HEADS = ['ID', 'Name', 'Type', 'Setting']
export const GROUP_SOURCE_LINK_HEADS = ['ID', 'Group', 'Links', '']

export const WEEK_DAYS_OPTIONS = [
    { label: 'Monday', value: 'mon' },
    { label: 'Tuesday', value: 'tue' },
    { label: 'Wednesday', value: 'wed' },
    { label: 'Thursday', value: 'thu' },
    { label: 'Friday', value: 'fri' },
    { label: 'Saturday', value: 'sat' },
    { label: 'Sunday', value: 'sun' },
]

export const JOB_TYPES_OPTIONS_SMALLCASE = [
    { label: 'Full Time Remote', value: 'full time remote' },
    { label: 'Full Time on Site', value: 'full time on site' },
    { label: 'Hybrid Full Time', value: 'hybrid full time' },
    { label: 'Hybrid Contract', value: 'hybrid contract' },
    { label: 'Contract Onsite', value: 'contract onsite' },
    { label: 'Contract Remote', value: 'contract remote' },
]
