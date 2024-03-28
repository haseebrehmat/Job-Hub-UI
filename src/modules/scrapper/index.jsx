import { memo, useState } from 'react'

import { Button } from '@components'

import { CronjobSetting, JobSourceLinks } from '@modules/scrapper/components'

import { JobSourceLinkIcon, CronjobSettingIcon } from '@icons'

const Profile = () => {
    const [activeTab, setActiveTab] = useState({ setting: true, links: false })

    return (
        <div className='p-2'>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
                <div className='flex flex-col mb-4'>
                    <div className='flex flex-row mb-4 md:gap-5'>
                        <Button
                            label='Cronjob Settings'
                            fit
                            icon={CronjobSettingIcon}
                            classes={`md:pr-8 md:pl-6 ${!activeTab.setting && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ setting: true, links: false })}
                        />
                        <Button
                            label='Job Source Links / URLs'
                            fit
                            icon={JobSourceLinkIcon}
                            classes={`md:pr-8 md:pl-6 ${!activeTab.links && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ setting: false, links: true })}
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
                </div>
            </div>
        </div>
    )
}

export default memo(Profile)
