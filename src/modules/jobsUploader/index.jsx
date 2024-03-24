import { React, useState } from 'react'

import { Button } from '@components'

import { FilesUploader, ManualJobs } from '@modules/jobsUploader/components'

const JobsUploader = () => {
    const [activeTab, setActiveTab] = useState({ jobposter: true, filesuploader: false })

    return (
        <div className='flex flex-col border shadow	text-[#006366] py-8'>
            <div className='flex flex-col mb-4'>
                <div className='flex flex-row mb-4 md:gap-5 ml-6'>
                    <Button
                        label='Post a Job'
                        fit
                        classes='md:pr-8 md:pl-6'
                        onClick={() => setActiveTab({ jobposter: true, filesuploader: false })}
                    />
                    <Button
                        label='Upload Job Files'
                        fit
                        classes='md:pr-8 md:pl-6'
                        onClick={() => setActiveTab({ jobposter: false, filesuploader: true })}
                    />
                </div>
                {activeTab.jobposter && <ManualJobs />}
                {activeTab.filesuploader && <FilesUploader />}
            </div>
        </div>
    )
}

export default JobsUploader
