import { memo } from 'react'

const Tooltip = ({ text, children }) => {
    console.log(text)

    return (
        <div className='group relative flex'>
            {children}
            <span className='absolute min-w-max bottom-full left-1/2 transform -translate-x-1/2 -translate-y-1.5 scale-0 transition-all duration-75 rounded-sm bg-gray-800 p-2 text-xs text-white group-hover:scale-100'>
                {text}
            </span>
        </div>
    )
}

export default memo(Tooltip)
