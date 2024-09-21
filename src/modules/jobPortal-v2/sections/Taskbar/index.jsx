import { memo } from 'react'
import { Tooltip } from 'react-tooltip'
import useSWRMutation from 'swr/mutation'

import { Button } from '@components'

import { useJobPortalV2Store } from '@/stores'

import { downloadJobsData } from '@modules/jobPortal-v2/api'
import { JobsStats } from '@modules/jobPortal-v2/components'

import { SWR_REVALIDATE } from '@constants/global'

import { GridViewIcon, ListViewIcon, DownloadIcon } from '@icons'

const Taskbar = () => {
    const [url, view, toggleView] = useJobPortalV2Store(state => [state?.url?.jobs, state?.view, state?.toggleView])

    const { isMutating } = useSWRMutation(url, downloadJobsData, SWR_REVALIDATE)

    return (
        <div className='flex flex-col md:flex-row items-center justify-between gap-2 text-sm bg-slate-100 border border-slate-300 rounded-xl p-4 md:p-3 text-[#048C8C]'>
            <div className='flex-grow'>
                <JobsStats />
            </div>
            <div className='flex gap-2 w-fit'>
                <Button
                    icon={DownloadIcon}
                    fit
                    disabled={isMutating}
                    classes='download-csv !py-[5px] !px-1.5 !m-0 !flex !items-center'
                    // onClick={() => trigger()}
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
            </div>
        </div>
    )
}

export default memo(Taskbar)
