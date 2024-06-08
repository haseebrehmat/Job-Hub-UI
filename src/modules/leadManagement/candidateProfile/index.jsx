import { memo } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

import { Badge, Button, Loading } from '@components'

import { fetchMyProfile } from '@modules/leadManagement/api'

import { JobSource, TechSTack, UserAppliedJobIcon, CompanyIcon, DateTimeIcon } from '@icons'

import { formatDate } from '@utils/helpers'

const MyProfile = () => {
    const { data, isLoading } = useSWR('api/candidate_management/candidate_profile/', fetchMyProfile)

    if (isLoading) return <Loading />
    return <div className=''></div>
}
export default memo(MyProfile)
