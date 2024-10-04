import { memo } from 'react'

const MonthsLegend = () => (
    <div className='w-full flex justify-end gap-6 px-4 flex-wrap'>
        <div className='flex gap-2 items-center text-[#C9B660]'>
            <span className='bg-[#C9B660] px-4 py-1.5' />
            <span>January</span>
        </div>
        <div className='flex gap-2 items-center text-[#91C960]'>
            <span className='bg-[#91C960] px-4 py-1.5' />
            <span>February</span>
        </div>
        <div className='flex gap-2 items-center text-[#FF5B33]'>
            <span className='bg-[#FF5B33] px-4 py-1.5' />
            <span>March</span>
        </div>
        <div className='flex gap-2 items-center text-[#862c4d]'>
            <span className='bg-[#862c4d] px-4 py-1.5' />
            <span>April</span>
        </div>
        <div className='flex gap-2 items-center text-[#62c9d3]'>
            <span className='bg-[#62c9d3] px-4 py-1.5' />
            <span>May</span>
        </div>
        <div className='flex gap-2 items-center text-[#5967ff]'>
            <span className='bg-[#5967ff] px-4 py-1.5' />
            <span>June</span>
        </div>
        <div className='flex gap-2 items-center text-[#0a7e8c]'>
            <span className='bg-[#0a7e8c] px-4 py-1.5' />
            <span>July</span>
        </div>
        <div className='flex gap-2 items-center text-[#895734]'>
            <span className='bg-[#895734] px-4 py-1.5' />
            <span>August</span>
        </div>
        <div className='flex gap-2 items-center text-[#890734]'>
            <span className='bg-[#890734] px-4 py-1.5' />
            <span>September</span>
        </div>
        <div className='flex gap-2 items-center text-[#240046]'>
            <span className='bg-[#240046] px-4 py-1.5' />
            <span>October</span>
        </div>
        <div className='flex gap-2 items-center text-[#3a506b]'>
            <span className='bg-[#3a506b] px-4 py-1.5' />
            <span>November</span>
        </div>
        <div className='flex gap-2 items-center text-[#006ba6]'>
            <span className='bg-[#006ba6] px-4 py-1.5' />
            <span>December</span>
        </div>
    </div>
)

export default memo(MonthsLegend)
