import { memo, useState } from 'react'

import { Button } from '@components'

import { VERTICAL_INITIAL_TABS, VERTICAL_SECTIONS } from '@constants/userManagement'
import { useParams } from 'react-router-dom'

const Verticals = () => {
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState(VERTICAL_INITIAL_TABS)

    const handleClick = key => {
        Object.keys(activeTab).forEach(k => (activeTab[k] = false))
        activeTab[key] = true
        setActiveTab({ ...activeTab })
    }

    console.log(id)

    return (
        <div className='p-2'>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
                <div className='flex flex-col mb-4'>
                    <div className='flex flex-col mb-4 space-y-2 md:gap-2 sm:flex-row sm:space-y-0'>
                        {Object.entries(activeTab).map(([key, value]) => (
                            <Button
                                key={key}
                                label={VERTICAL_SECTIONS[key] ?? 'Other'}
                                fit
                                classes={`rounded-none border-0 border-b-4 ${
                                    !value && 'border-gray-200 text-gray-500'
                                }`}
                                onClick={() => handleClick(key)}
                            />
                        ))}
                    </div>
                    {activeTab.basic && <div className='mt-5'>here goes basic info</div>}
                    {activeTab.experience && <div className='mt-5'>here goes experience</div>}
                    {activeTab.skill && <div className='mt-5'>here goes skills</div>}
                    {activeTab.education && <div className='mt-5'>here goes educations</div>}
                    {activeTab.hobby && <div className='mt-5'>here goes hobbys</div>}
                    {activeTab.language && <div className='mt-5'>here goes languages</div>}
                    {activeTab.summary && <div className='mt-5'>here goes summarys</div>}
                </div>
            </div>
        </div>
    )
}

export default memo(Verticals)
