import { memo } from 'react'

import { formatNum } from '@utils/helpers'
import { TECH_STACK_NUMBER_STYLE } from '@constants/analytics'

const TechStackStats = ({ data = [], set = null }) => (
    <div className='border px-2 pt-10 pb-4 text-[#1E6570] mt-10 relative'>
        <p className='-mt-16 absolute px-2 py-1.5 border bg-[#EDFDFB] text-lg tracking-widest'>Tech Stacks Counts</p>
        {data?.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {data?.map((d, index) => (
                    <div
                        className='border shadow-md pl-2 pr-3 py-2 bg-[#edfdfb] w-full cursor-pointer hover:bg-[#c4f5ed] hover:text-[#1E6570]'
                        key={index}
                        onClick={() => set({ stack: d.name })}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <span style={TECH_STACK_NUMBER_STYLE}>{formatNum(d.value ?? 0)}</span>
                                <p className='uppercase text-xs tracking-widest'>{d.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <span className='italic ml-2'>No statics found yet</span>
        )}
    </div>
)

export default memo(TechStackStats)
