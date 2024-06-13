import { memo } from 'react'
import useSWR from 'swr'

import { Loading } from '@/components'

import { CandidateProfile, LineGraph } from '@modules/leadManagement/components'

import { fetchMyProfile } from '@modules/leadManagement/api'

const MyProfile = () => {
    const { data, isLoading, mutate } = useSWR('api/candidate_management/candidate_profile/', fetchMyProfile)

    if (isLoading) return <Loading />
    return (
        <div>
            <div>
                <CandidateProfile data={data} mutate={mutate} />
            </div>
            <div className='grid grid-cols-2 px-6'>
                <div className='px-4'>
                    <LineGraph data={data} />
                </div>
                <div className='px-4'>
                    <LineGraph data={data} />
                </div>
            </div>
            <div className='grid grid-cols-2 px-6 mt-6'>
                <div className='px-4'>
                    <LineGraph data={data} />
                </div>
                <div className='px-4'>
                    <LineGraph data={data} />
                </div>
            </div>
        </div>
    )
}
export default memo(MyProfile)
