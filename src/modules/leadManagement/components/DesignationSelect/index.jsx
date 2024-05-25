import { memo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'

import { fetchRoles } from '@modules/userManagement/api'

import { parseRoles, parseSelectedRole } from '@utils/helpers'

const DesignationSelect = ({ value: selected, error = null, set }) => {
    const { data, isLoading, error: fetchError } = useSWR('/api/auth/role/', fetchRoles)

    return isLoading ? (
        <small className='ml-1 mt-3 p-3 text-xs text-gray-400'>Designation Loading...</small>
    ) : fetchError ? (
        <div>Failed to load designations</div>
    ) : (
        <div>
            <span className='text-xs font-semibold'>Designation*</span>
            <CustomSelector
                options={parseRoles(data?.roles)}
                selectorValue={parseSelectedRole(selected, data?.roles)}
                handleChange={({ value }) => set('desgination', value)}
                placeholder='Select Designation'
            />
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default memo(DesignationSelect)
