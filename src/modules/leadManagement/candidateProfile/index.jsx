import { memo } from 'react'
import useSWR from 'swr'

import { Loading } from '@components'

import { CandidateProfile, Projects, Skills, Tools } from '@modules/leadManagement/components'

import { fetchMyProfile } from '@modules/leadManagement/api'

const MyProfile = () => {
    const { data, isLoading, mutate } = useSWR('api/candidate_management/candidate_profile/', fetchMyProfile)

    if (isLoading) return <Loading />
    return (
        <div>
            <div className='grid space-y-3 md:grid-cols-2 md:px-6 md:space-y-0 px-2'>
                <div className='grid h-fit space-y-3 md:space-y-8'>
                    <CandidateProfile data={data} mutate={mutate} />
                    <Projects data={data} />
                </div>
                <div className='grid h-fit space-y-3 md:space-y-8'>
                    <Skills data={data} />
                    <Tools data={data} />
                </div>
            </div>
        </div>
    )
}
export default memo(MyProfile)
