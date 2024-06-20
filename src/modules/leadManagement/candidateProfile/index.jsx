import { memo } from 'react'
import useSWR from 'swr'

import { Loading } from '@/components'

import { CandidateProfile, LineGraph, Skills } from '@modules/leadManagement/components'

import { fetchMyProfile } from '@modules/leadManagement/api'

const MyProfile = () => {
    const { data, isLoading, mutate } = useSWR('api/candidate_management/candidate_profile/', fetchMyProfile)

    if (isLoading) return <Loading />
    return (
        <div>
            <div className='grid grid-cols-2 px-6'>
                <div className='grid grid-cols-1 h-fit space-y-8'>
                    <CandidateProfile data={data} mutate={mutate} />
                    <Skills data={data} />
                </div>
                <div className='grid grid-cols-1'>
                    <LineGraph data={data} />
                    <LineGraph data={data} />
                </div>
            </div>
        </div>
    )
}
export default memo(MyProfile)
