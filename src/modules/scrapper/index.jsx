import { memo, useState } from 'react'

import { Button } from '@components'

import { CronjobSetting, JobSourceLinks, ScraperStatus, Logs } from '@modules/scrapper/components'

import { JobSourceLinkIcon, CronjobSettingIcon, RunningScrapperIcon, LogsIcon } from '@icons'

const Profile = () => {
    const [activeTab, setActiveTab] = useState({ setting: true, links: false, status: false, logs: false })

    const handleClick = key => {
        Object.keys(activeTab).forEach(k => (activeTab[k] = false))
        activeTab[key] = true
        setActiveTab({ ...activeTab })
    }

    return (
        <div className='p-2'>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
                <div className='flex flex-col mb-4'>
                    <div className='flex flex-col mb-4 space-y-2 md:gap-5 sm:flex-row sm:space-y-0'>
                        <Button
                            label='Cronjob Settings'
                            fit
                            fill={activeTab.setting}
                            icon={CronjobSettingIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.setting && 'border-gray-200'}`}
                            onClick={() => handleClick('setting')}
                        />
                        <Button
                            label='Job Source Links / URLs'
                            fit
                            fill={activeTab.links}
                            icon={JobSourceLinkIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.links && 'border-gray-200'}`}
                            onClick={() => handleClick('links')}
                        />
                        <Button
                            label='Running Scrapers'
                            fit
                            fill={activeTab.status}
                            icon={RunningScrapperIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.status && 'border-gray-200'}`}
                            onClick={() => handleClick('status')}
                        />
                        <Button
                            label='Logs'
                            fit
                            fill={activeTab.logs}
                            icon={LogsIcon}
                            classes={`md:pr-8 md:pl-6 rounded-none ${!activeTab.status && 'border-gray-200'}`}
                            onClick={() => handleClick('logs')}
                        />
                    </div>
                    {activeTab.setting && (
                        <div className='mt-5'>
                            <CronjobSetting />
                        </div>
                    )}
                    {activeTab.links && (
                        <div className='mt-5'>
                            <JobSourceLinks />
                        </div>
                    )}
                    {activeTab.status && (
                        <div className='mt-5'>
                            <ScraperStatus />
                        </div>
                    )}
                    {activeTab.logs && (
                        <div className='mt-5'>
                            <Logs />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(Profile)
