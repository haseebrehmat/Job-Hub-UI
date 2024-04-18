import { memo } from 'react'
import { useParams } from 'react-router-dom'

import { CustomSelector } from '@components'

import { parsePlatform } from '@utils/helpers'
import { SOCIAL_PLATFORM_OPTIONS } from '@constants/pseudos'
import Template1 from '@modules/settings/resumeBuilder/template1'
import { devProfile } from '@modules/settings/resumeBuilder/devProfile'
import { TextEditor } from '@/components'

const ApplyForJob = () => {
    const { id } = useParams()

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
                    <Template1 data={devProfile} />
                </div>
            </div>
        </div>
    )
}

export default memo(ApplyForJob)
