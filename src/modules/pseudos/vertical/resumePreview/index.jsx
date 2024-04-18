import { memo, useState } from 'react'
import useSWR from 'swr'

import Template1 from '@modules/settings/resumeBuilder/template1'
import Template2 from '@modules/settings/resumeBuilder/template2'

import { Button, Loading } from '@components'

import { ActionButtons } from '@modules/pseudos/components'
import { fetchProfile } from '@modules/pseudos/api'

const ResumeBuilder = ({ id }) => {
    const [tab, setTab] = useState(1)
    const { data, isLoading, mutate } = useSWR(`/api/profile/resume/${id}/`, fetchProfile)

    if (isLoading) return <Loading />
    return (
        <div className='flex flex-col'>
            <div className='flex flex-col items-center'>
                <div className='flex flex-row mb-4 gap-5'>
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
                {tab === 1 && <Template1 data={data} />}
                {tab === 2 && <Template2 data={data} />}
            </div>
            <div className='bg-white px-4 mt-4 pt-4'>
                <ActionButtons mutate={mutate} />
            </div>
        </div>
    )
}

export default memo(ResumeBuilder)
