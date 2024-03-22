import { memo } from 'react'

const Badge = ({ label, type = 'default' }) => {
    let classes
    switch (type) {
        case 'success':
            classes = 'bg-green-100 text-green-800'
            break
        case 'enabled':
            classes = 'bg-[#048C8C] text-white'
            break
        case 'disabled':
            classes = 'bg-[#FF6280] text-white'
            break
        default:
            classes = 'bg-blue-100 text-blue-800'
    }
    return <span className={`${classes} text-xs font-medium mr-2 px-2 py-1 rounded-full`}>{label || '-'}</span>
}

export default memo(Badge)
