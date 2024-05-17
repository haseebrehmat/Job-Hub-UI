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
    margin: 0.015,
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
}

export const UPLOAD_RESUME_OPTIONS = [
    { label: 'Choose from templates', value: 'automatic' },
    { label: 'Upload yourself', value: 'manual' },
]
