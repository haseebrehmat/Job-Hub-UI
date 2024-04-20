import { memo, useState } from 'react'

import { Button } from '@components'

import { Template1, Template2 } from '@modules/settings/templates'
import { devProfile } from '@modules/settings/resumeBuilder/devProfile'

const ResumeBuilder = () => {
    const [tab, setTab] = useState(1)

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-row mb-5 gap-5'>
                <Button
                    label='Template 1'
                    fit
                    fill={tab === 1}
                    classes={`md:px-6 rounded-none ${tab !== 1 && 'border-gray-200'}`}
                    onClick={() => setTab(1)}
                />
                <Button
                    label='Template 2'
                    fit
                    fill={tab === 2}
                    classes={`md:px-6 rounded-none ${tab !== 2 && 'border-gray-200'}`}
                    onClick={() => setTab(2)}
                />
            </div>
            {tab === 1 && (
                <div className='p-8 bg-white shadow-2xl border-2 rounded-lg md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                    <Template1 data={devProfile} />
                </div>
            )}
            {tab === 2 && (
                <div className='p-10 bg-white shadow-2xl border-2 rounded-lg md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                    <Template2 data={devProfile} />
                </div>
            )}
        </div>
    )
}

export default memo(ResumeBuilder)
