import { memo } from 'react'

const StatsTitle = ({ title = 'Statistics', sub = 'Listing of Stats' }) => (
    <>
        <p className='text-lg text-gray-700 border-b font-semibold'>{title}</p>
        <small className='text-gray-500'>{sub}</small>
    </>
)

export default memo(StatsTitle)
