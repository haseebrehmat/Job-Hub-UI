import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Resumes } from '@components'

import { ActionButtons, Sections } from '@modules/pseudos/components'
import { fetchProfile } from '@modules/pseudos/api'

import { getSectionNames, getSectionStatus } from '@utils/helpers'
import { DEFAULT_SECTIONS } from '@constants/pseudos'

const ResumePreview = ({ id }) => {
    const [hide, setHide] = useState(getSectionStatus(DEFAULT_SECTIONS))
    const [names, setNames] = useState(getSectionNames(DEFAULT_SECTIONS))

    const { data, isLoading, mutate } = useSWR(`/api/profile/resume/${id}/`, fetchProfile, {
        onSuccess: fetchedData => {
            if (
                !(
                    fetchedData?.sections &&
                    Object.keys(fetchedData?.sections).length === 0 &&
                    fetchedData?.sections?.constructor === Object
                )
            ) {
                console.log('fetchedData?.sections', fetchedData?.sections)
                setHide(getSectionStatus(fetchedData.sections))
                setNames(getSectionNames(fetchedData.sections))
            }
        },
    })

    if (isLoading) return <Loading />
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
                        <Resumes data={data} hide={hide} names={names} />
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

export default memo(ResumePreview)
