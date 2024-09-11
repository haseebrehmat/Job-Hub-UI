import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { OrderBy, Visibility } from '@modules/jobPortal-v2/components'

const Taskbar = () => {
    const [filters] = useJobPortalV2Store(state => [state?.filters])

    console.log(filters)

    return (
        <div className='flex justify-end gap-2 bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-[#048C8C] text-sm'>
            <OrderBy />
            <Visibility />
        </div>
    )
}

export default memo(Taskbar)
