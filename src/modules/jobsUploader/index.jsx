import { React, useState } from 'react'

import { Button } from '@components'

import { FilesUploader, ManualJobs } from '@modules/jobsUploader/components'

import { PostJobIcon, UploadJobIcon } from '@icons'

const JobsUploader = () => {
    const [activeTab, setActiveTab] = useState({ jobposter: true, filesuploader: false })

    return (
        <div className='flex flex-col border shadow	text-[#006366] py-8'>
            <div className='flex flex-col mb-4'>
                <div className='flex flex-row mb-4 md:gap-5 ml-6'>
                    <Button
                        label='Post a Job'
                        fit
                        icon={PostJobIcon}
                        classes={`md:pr-8 md:pl-6 ${activeTab.jobposter && 'text-white bg-[#048C8C]'}`}
                        onClick={() => setActiveTab({ jobposter: true, filesuploader: false })}
                    />
                    <Button
                        label='Upload Job Files'
                        fit
                        icon={UploadJobIcon}
                        classes={`md:pr-8 md:pl-6 ${activeTab.filesuploader && 'text-white bg-[#048C8C]'}`}
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
