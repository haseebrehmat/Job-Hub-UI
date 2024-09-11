import { memo } from 'react'

import { useJobPortalV2Store } from '@/stores'

import { OrderBy } from '@modules/jobPortal-v2/components'

const Taskbar = () => {
    const [filters, update] = useJobPortalV2Store(state => [state?.filters, state?.setFilters])

    return (
        <div className='flex items-center justify-end gap-2 bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-[#048C8C] text-sm'>
            <OrderBy />
            <div>
                Job Visibility
                <select
                    value={filters?.visible}
                    onChange={e => update?.visible(e.target.value)}
                    className='bg-gray-50 text-gray-900 text-sm focus:[#048C8C]-500 focus:border-[#048C8C]-500 block w-full p-2.5 rounded-lg border border-cyan-600 appearance-none focus:outline-none focus:ring-0 focus:border-[#048C8C] peer'
                >
                    <option value='all'>All</option>
                    <option value='recruiter'>Recruiter</option>
                    <option value='non-recruiter'>Non-Recruiter</option>
                </select>
            </div>
        </div>
    )
}

export default memo(Taskbar)
