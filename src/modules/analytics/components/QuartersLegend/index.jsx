import { memo } from 'react'

const QuartersLegend = () => (
    <div className='w-full flex justify-end gap-6 px-4 flex-wrap'>
        <div className='flex gap-2 items-center text-[#C9B660]'>
            <span className='bg-[#C9B660] px-4 py-1.5' />
            <span>Quarter 1</span>
        </div>
        <div className='flex gap-2 items-center text-[#91C960]'>
            <span className='bg-[#91C960] px-4 py-1.5' />
            <span>Quarter 2</span>
        </div>
        <div className='flex gap-2 items-center text-[#FF5B33]'>
            <span className='bg-[#FF5B33] px-4 py-1.5' />
            <span>Quarter 3</span>
        </div>
        {/* <div className='flex gap-2 items-center text-[#4E6E58]'>
            <span className='bg-[#4E6E58] px-4 py-1.5' />
            <span>Quarter 4</span>
        </div> */}
    </div>
)

export default memo(QuartersLegend)
