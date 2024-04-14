import { memo, useState } from 'react'

import Template1 from './template1'
import Template2 from './template2'

import { Button } from '@components'

import { devProfile } from './devProfile'

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
            {tab === 1 && <Template1 data={devProfile} />}
            {tab === 2 && <Template2 data={devProfile} />}
        </div>
    )
}

export default memo(ResumeBuilder)
