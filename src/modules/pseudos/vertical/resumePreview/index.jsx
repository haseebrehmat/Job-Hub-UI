import { memo, useState } from 'react'
import useSWR from 'swr'

import { Button, Loading } from '@components'

import { ActionButtons, Sections } from '@modules/pseudos/components'
import { fetchProfile } from '@modules/pseudos/api'
import { Template1, Template2, Template3, Template4 } from '@modules/settings/templates'

import { getSectionNames, getSectionStatus } from '@utils/helpers'
import { DEFAULT_SECTIONS } from '@constants/pseudos'

const ResumeBuilder = ({ id }) => {
    const { data, isLoading, mutate } = useSWR(`/api/profile/resume/${id}/`, fetchProfile)

    const [tab, setTab] = useState(1)
    const [hide, setHide] = useState(getSectionStatus(data?.sections ?? DEFAULT_SECTIONS))
    const [names, setNames] = useState(getSectionNames(data?.sections ?? DEFAULT_SECTIONS))

    if (isLoading) return <Loading />

    const templatesArray = [
        <Template1 data={data} hide={hide} names={names} />,
        <Template2 data={data} hide={hide} names={names} />,
        <Template3 data={data} hide={hide} names={names} />,
        <Template4 data={data} hide={hide} names={names} />,
    ]

    return (
        <div className='flex flex-col'>
            <div className='flex justify-around items-start'>
                {data ? (
                    <>
                        <Sections
                            hide={hide}
                            setHide={setHide}
                            names={names}
                            setNames={setNames}
                            mutate={mutate}
                            id={id}
                        />
                        <div className='flex flex-col items-center'>
                            <div className='flex flex-row mb-4 gap-5'>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Button
                                        key={i}
                                        label={`Template ${i + 1}`}
                                        fit
                                        fill={tab === i + 1}
                                        classes={`md:px-6 rounded-none ${tab !== i + 1 && 'border-gray-200'}`}
                                        onClick={() => setTab(i + 1)}
                                    />
                                ))}
                            </div>
                            {templatesArray.map((component, index) =>
                                tab === index + 1 ? (
                                    <div className='__template-wrapper' key={index}>
                                        {component}
                                    </div>
                                ) : null
                            )}
                        </div>
                    </>
                ) : (
                    <span>Error to load resume previews</span>
                )}
            </div>
            <div className='bg-white px-4 mt-4 pt-4'>
                <ActionButtons mutate={mutate} />
            </div>
        </div>
    )
}

export default memo(ResumeBuilder)
