import { memo } from 'react'
import useSWR from 'swr'

import { SelectBox } from '@components'
import { fetchRoles } from '@modules/userManagement/api'

import { parseRoles, parseSelectedRole } from '@utils/helpers'

const RolesDropdown = ({ value: selected, error = null, setFieldValue, onChange = null }) => {
    const { data, isLoading, error: fetchError } = useSWR('/api/auth/role/', fetchRoles)

    return isLoading ? (
        <small className='ml-1 p-3 text-xs text-gray-400'>Roles Loading...</small>
    ) : fetchError ? (
        <div>Failed to load roles</div>
    ) : (
        <>
            <span className='text-xs font-semibold'>Role*</span>
            <SelectBox
                options={parseRoles(data?.roles)}
                selected={parseSelectedRole(selected, data?.roles)}
                handleChange={onChange || (({ value }) => setFieldValue('roles', value))}
                classes='text-gray-500 text-sm'
            />
            {error && <small className='ml-1 text-xs text-red-600'>{error}</small>}
        </>
    )
}

export default memo(RolesDropdown)
