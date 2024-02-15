import { Cold, Hired, Prospects, Rejected, Total, Warm, Hot } from '@svgs'

export const statsIcons = {
    total: Total,
    prospects: Prospects,
    cold: Cold,
    warm: Warm,
    hot: Hot,
    rejected: Rejected,
    hired: Hired,
}

export const date = new Date()
export const year = date.getFullYear().toString().padStart(4, '0')
export const month = (date.getMonth() + 1).toString().padStart(2, '0')
export const day = date.getDate().toString().padStart(2, '0')
export const today = `${year}-${month}-${day}`
