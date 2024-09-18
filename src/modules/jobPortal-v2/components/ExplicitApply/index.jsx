import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

const ExplicitApply = () => {
    const [apply, reset] = useJobPortalV2Store(state => [state?.applyFilters, state?.resetFilters])

    return (
        <div className='w-full flex flex-wrap items-center gap-2 justify-between text-[15px] -my-1'>
            <span className='cursor-pointer border px-[37px] py-1 rounded-lg border-[#338d8c]' onClick={() => apply()}>
                Search
            </span>
            <span className='cursor-pointer border px-[52px] py-1 rounded-lg border-[#338d8c]' onClick={() => reset()}>
                Reset
            </span>
        </div>
    )
}

export default memo(ExplicitApply)
