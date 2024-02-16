import { memo } from 'react'

const StatCard = memo(({ value, label, icon }) => (
    <div className='w-min-0 rounded-lg shadow-md bg-white border'>
        <div className='p-3 flex items-center justify-between'>
            <div className='p-2 md:p-4 rounded-lg bg-[#0EB3AD] -mt-14'>{icon}</div>
            <div className='flex flex-col items-end'>
                <p className='mb-1 text-sm font-light text-gray-600 text-end'>{label}</p>
                <p className='text-xl font-medium text-[#0EB3AD]'>{value}</p>
            </div>
        </div>
    </div>
))

export default StatCard
