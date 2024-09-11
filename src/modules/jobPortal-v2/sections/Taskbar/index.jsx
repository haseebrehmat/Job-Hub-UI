import { memo } from 'react'

import { Input } from '@components'

import { useJobPortalV2Store } from '@/stores'

import { OrderBy, Visibility } from '@modules/jobPortal-v2/components'

import { SearchIcon } from '@icons'

const Taskbar = () => {
    const [query, setQuery, applySearch] = useJobPortalV2Store(state => [
        state?.query,
        state?.setQuery,
        state?.setParams,
    ])

    return (
        <div className='flex items-center justify-between gap-2 bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-[#048C8C] text-sm'>
            <div className='flex items-center w-1/2'>
                <div className='relative hidden md:block flex-1 bg-white'>
                    <Input
                        ph='Search by typing keywords...'
                        value={query}
                        onChange={e => setQuery(e?.target?.value)}
                        onKeyDown={e => (e.key === 'Enter' ? applySearch() : null)}
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-xl'>{SearchIcon}</div>
                </div>
            </div>
            <div className='flex gap-3 w-fit'>
                <OrderBy />
                <Visibility />
            </div>
        </div>
    )
}

export default memo(Taskbar)
