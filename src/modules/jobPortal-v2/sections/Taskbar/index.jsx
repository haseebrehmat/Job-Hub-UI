import { memo } from 'react'
import { Tooltip } from 'react-tooltip'
import useSWRMutation from 'swr/mutation'

import { Input, Button } from '@components'

import { useJobPortalV2Store } from '@/stores'

import { downloadJobsData } from '@modules/jobPortal-v2/api'
import { OrderBy, Visibility } from '@modules/jobPortal-v2/components'

import { SearchIcon, GridViewIcon, ListViewIcon, DownloadIcon } from '@icons'

const Taskbar = () => {
    const [query, paramQuery, view, filters, setQuery, applySearch, toggleView] = useJobPortalV2Store(state => [
        state?.query,
        state?.paramQuery,
        state?.view,
        state?.params,
        state?.setQuery,
        state?.setParams,
        state?.toggleView,
    ])

    const { trigger, isMutating } = useSWRMutation([paramQuery, filters], () => downloadJobsData(paramQuery, filters), {
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        revalidateOnFocus: false,
    })

    return (
        <div className='flex items-center justify-between gap-2 bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-[#048C8C] text-sm'>
            <div className='flex items-center gap-3 w-1/2'>
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
            <div className='flex gap-2 w-fit'>
                <OrderBy />
                <Visibility />
                <Button
                    icon={DownloadIcon}
                    fit
                    disabled={isMutating}
                    classes='download-csv !py-[5px] !px-1.5 !m-0 !flex !items-center'
                    onClick={() => trigger()}
                />
                <Tooltip anchorSelect='.download-csv' content={isMutating ? 'Downloading...' : 'Download Csv'} />
                <Button
                    icon={view === 'list' ? ListViewIcon : GridViewIcon}
                    fit
                    fill={view === 'grid'}
                    classes='toggle-view !py-[9px] !m-0 !flex !items-center'
                    onClick={() => toggleView()}
                />
                <Tooltip anchorSelect='.toggle-view' content='Toggle View' />
            </div>
        </div>
    )
}

export default memo(Taskbar)
