export const JOB_HEADS = [
    'Job Title',
    'Company',
    'Job Source',
    'Tech Stack',
    'Job Type',
    'Date Posted',
    'Status',
    'recruiter',
    // 'cover letter',
]

export const MANUAL_JOBS_HEADS = ['Job Title', 'Company', 'Job Source', 'Tech Stack', 'Job Type', 'Date Posted']

export const RESUME_PDF_OPTIONS = {
    margin: 0.5, // may be 0.25
    filename: 'resume.pdf',
    html2canvas: { scale: 4 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
}

export const UPLOAD_RESUME_OPTIONS = [
    { label: 'Choose from templates', value: 'automatic' },
    { label: 'Upload yourself', value: 'manual' },
]
