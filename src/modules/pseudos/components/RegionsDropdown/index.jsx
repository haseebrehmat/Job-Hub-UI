import { memo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchCompanies } from '@modules/userManagement/api'

import { parseRegions } from '@utils/helpers'

const RegionsDropdown = ({ value, set }) => {
    const { data, isLoading, error } = useSWR('/api/auth/company/', fetchCompanies)

    return isLoading ? (
        <small className='ml-1 p-3 text-xs text-gray-400'>Regions Loading...</small>
    ) : error ? (
        <small className='ml-1 p-3 text-[#328d8c]'>Failed to load regions</small>
    ) : (
        <>
            <span className='text-xs font-semibold'>Region*</span>
            <CustomSelector
                options={parseRegions(data?.companies)}
                handleChange={obj => set(obj)}
                selectorValue={value}
                isMulti
                placeholder='Select Regions'
            />
        </>
    )
}

export default memo(RegionsDropdown)
