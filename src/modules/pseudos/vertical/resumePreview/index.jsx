import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, Loading } from '@components'

import { ActionButtons } from '@modules/pseudos/components'
import { fetchProfile } from '@modules/pseudos/api'
import { Template1, Template2, Template3 } from '@modules/settings/templates'

const ResumeBuilder = ({ id }) => {
    const [tab, setTab] = useState(1)
    const { data, isLoading, mutate } = useSWR(`/api/profile/resume/${id}/`, fetchProfile)

    if (isLoading) return <Loading />
    return (
        <div className='flex flex-col'>
            {data ? (
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
                        <Button
                            label='Template 3'
                            fit
                            fill={tab === 3}
                            classes={`md:px-6 rounded-none ${tab !== 2 && 'border-gray-200'}`}
                            onClick={() => setTab(3)}
                        />
                    </div>
                    {tab === 1 && (
                        <div className='p-8 bg-white shadow-2xl border-2 rounded-lg md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                            <Template1 data={data} />
                        </div>
                    )}
                    {tab === 2 && (
                        <div className='p-10 bg-white shadow-2xl border-2 rounded-lg md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                            <Template2 data={data} />
                        </div>
                    )}
                    {tab === 3 && (
                        <div className='p-10 bg-white shadow-2xl border-2 rounded-lg md:w-[21cm] md:min-h-[29.7cm] w-full h-full'>
                            <Template3 data={data} />
                        </div>
                    )}
                </div>
            ) : (
                <span>Error to load resume previews</span>
            )}
            <div className='bg-white px-4 mt-4 pt-4'>
                <ActionButtons mutate={mutate} />
            </div>
        </div>
    )
}

export default memo(ResumeBuilder)
