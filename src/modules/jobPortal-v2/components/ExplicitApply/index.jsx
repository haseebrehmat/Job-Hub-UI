import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

const ExplicitApply = () => {
    const [apply, reset] = useJobPortalV2Store(state => [state?.applyFilters, state?.resetFilters])

    return (
        <div className='w-full flex items-center gap-3 text-sm justify-end -mb-2'>
            <span className='cursor-pointer border px-5 py-1 rounded-lg border-[#338d8c]' onClick={() => apply()}>
                Search
            </span>
            <span className='cursor-pointer border px-5 py-1 rounded-lg border-[#338d8c]' onClick={() => reset()}>
                Reset
            </span>
        </div>
    )
}

export default memo(ExplicitApply)
