import { memo } from 'react'

const Badge = ({ label, type = 'default' }) => {
    const classes = type === 'default' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
    return <span className={`${classes} text-xs font-medium mr-2 px-2 py-1 rounded-full`}>{label || '-'}</span>
}

export default memo(Badge)
