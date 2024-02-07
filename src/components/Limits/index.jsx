import { memo } from 'react'

const Limits = memo(({ total = 0 }) => (
    <span className='text-sm font-normal text-gray-500'>
        Showing <span className='font-semibold text-gray-900 '>1-12</span> of{' '}
        <span className='font-semibold text-gray-900'>{total}</span>
    </span>
))

export default Limits
