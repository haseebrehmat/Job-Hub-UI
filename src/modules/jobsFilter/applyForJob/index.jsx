import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CustomSelector, TextEditor, Button } from '@components'

import Template1 from '@modules/settings/resumeBuilder/template1'
import Template2 from '@modules/settings/resumeBuilder/template2'
import { devProfile } from '@modules/settings/resumeBuilder/devProfile'

import { parsePlatform } from '@utils/helpers'
import { SOCIAL_PLATFORM_OPTIONS } from '@constants/pseudos'
import { SelectedIcon } from '@/assets/icons'

const ApplyForJob = () => {
    const { id } = useParams()
    const [tab, setTab] = useState(1)

    return (
        <div className='max-w-full mb-14 px-5'>
            <div className='flex gap-5'>
                <div className='flex flex-col space-y-4 w-1/2 bg-[#edfdfb] p-5 border border-gray-200 rounded-lg h-full'>
                    <div className='z-20'>
                        <p className='italic text-gray-600 py-2'>Select Vertical</p>
                        <CustomSelector
                            options={SOCIAL_PLATFORM_OPTIONS}
                            selectorValue={parsePlatform('facebook')}
                            handleChange={({ value }) => console.log(value)}
                            placeholder='Select vertical'
                        />
                    </div>
                    <TextEditor init={`Here your cover letter ${id}`} />
                </div>
                <div className='xs:w-1/2'>
                    <div className='flex flex-col items-center'>
                        <div className='flex flex-row mb-5 gap-5'>
                            <Button
                                label='Template 1'
                                fit
                                fill={tab === 1}
                                icon={tab === 1 && SelectedIcon}
                                classes={`md:px-6 rounded-none ${tab !== 1 && 'border-gray-200'}`}
                                onClick={() => setTab(1)}
                            />
                            <Button
                                label='Template 2'
                                fit
                                fill={tab === 2}
                                icon={tab === 2 && SelectedIcon}
                                classes={`md:px-6 rounded-none ${tab !== 2 && 'border-gray-200'}`}
                                onClick={() => setTab(2)}
                            />
                        </div>
                        {tab === 1 && <Template1 data={devProfile} />}
                        {tab === 2 && <Template2 data={devProfile} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ApplyForJob)
