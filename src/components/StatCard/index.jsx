import { memo } from 'react'

const StatCard = memo(({ value, label, icon, index }) => (
    <div className={`w-min-0 rounded-lg shadow-md _gradient-${index} border`}>
        <div className='p-3 flex items-center justify-between'>
            <div className='flex flex-col'>
                <p className='mb-1 text-lg font-medium text-[#048C8C]'>{label}</p>
                <span className='text-lg text-[#0EB3AD]'>{value}</span>
            </div>
            <div className='p-2 md:p-3 rounded-lg _shadow-1 bg-white -mt-14'>
                <img src={icon} alt={label} />
            </div>
        </div>
    </div>
))

export default StatCard
