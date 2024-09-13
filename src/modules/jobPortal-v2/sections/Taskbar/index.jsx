import { memo } from 'react'
import { Tooltip } from 'react-tooltip'
import useSWRMutation from 'swr/mutation'

import { Input, Button, Filters } from '@components'

import { useJobPortalV2Store } from '@/stores'

import { downloadJobsData } from '@modules/jobPortal-v2/api'
import { NextAndPrev, OrderBy, Visibility } from '@modules/jobPortal-v2/components'

import { SearchIcon, GridViewIcon, ListViewIcon, DownloadIcon } from '@icons'

const Taskbar = () => {
    const [url, query, view, setQuery, toggleView, apply, reset] = useJobPortalV2Store(state => [
        state?.url?.jobs,
        state?.query,
        state?.view,
        state?.setQuery,
        state?.toggleView,
        state?.applyFilters,
        state?.resetFilters,
    ])

    const { trigger, isMutating } = useSWRMutation(url, downloadJobsData, {
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    return (
        <div className='flex items-center justify-between gap-2 bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-[#048C8C] text-sm'>
            <div className='flex gap-3 w-3/5'>
                <div className='relative hidden md:block flex-1 bg-white'>
                    <Input
                        ph='Search by typing keywords...'
                        value={query}
                        onChange={e => setQuery(e?.target?.value)}
                        onKeyDown={e => (e.key === 'Enter' ? apply() : null)}
                    />
                    <div className='absolute inset-y-0 right-0 flex items-center pr-3 text-xl'>{SearchIcon}</div>
                </div>
                <Filters apply={() => apply()} clear={() => reset()} />
            </div>
            <div className='flex gap-2 w-fit flex-wrap'>
                <OrderBy />
                <Visibility />
                <Button
                    icon={DownloadIcon}
                    fit
                    disabled={isMutating}
                    classes='download-csv !py-[5px] !px-1.5 !m-0 !flex !items-center'
                    onClick={() => trigger()}
                />
                <Tooltip
                    anchorSelect='.download-csv'
                    style={{ backgroundColor: '#338d8c', fontSize: '15px', letterSpacing: '2px' }}
                    content={isMutating ? 'Downloading...' : 'Download Csv'}
                />
                <Button
                    icon={view === 'list' ? ListViewIcon : GridViewIcon}
                    fit
                    fill={view === 'grid'}
                    classes='toggle-view !py-[9px] !m-0 !flex !items-center'
                    onClick={() => toggleView()}
                />
                <Tooltip anchorSelect='.toggle-view' content='Toggle View' />
                <NextAndPrev />
            </div>
        </div>
    )
}

export default memo(Taskbar)
