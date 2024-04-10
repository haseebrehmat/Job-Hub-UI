import { memo, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@components'

import { BasicInfo, Skills, Experiences, Education, Languages } from '@modules/pseudos/vertical/sections'

import { VERTICAL_INITIAL_TABS, VERTICAL_SECTIONS } from '@constants/pseudos'

const Vertical = () => {
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState(VERTICAL_INITIAL_TABS)

    const handleClick = key => {
        Object.keys(activeTab).forEach(k => (activeTab[k] = false))
        activeTab[key] = true
        setActiveTab({ ...activeTab })
    }

    return (
        <div className='p-2'>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
                <div className='flex flex-col mb-4 space-y-2 md:gap-2 sm:flex-row sm:space-y-0'>
                    {Object.entries(activeTab).map(([key, value]) => (
                        <Button
                            key={key}
                            label={VERTICAL_SECTIONS[key] ?? 'Other'}
                            fit
                            classes={`rounded-none border-0 border-b-4 ${!value && 'border-gray-200 text-gray-500'}`}
                            onClick={() => handleClick(key)}
                        />
                    ))}
                </div>
                {activeTab.basic && <BasicInfo id={id} />}
                {activeTab.skill && <Skills id={id} />}
                {activeTab.experience && <Experiences id={id} />}
                {activeTab.education && <Education id={id} />}
                {activeTab.language && <Languages id={id} />}
            </div>
        </div>
    )
}

export default memo(Vertical)
