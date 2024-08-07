import { memo, useMemo } from 'react'
import useSWR from 'swr'

import { CustomSelector } from '@components'
import { fetchRoles } from '@modules/userManagement/api'

import { parseRoles, parseSelectedRole } from '@utils/helpers'

const RolesDropdown = ({ value: selected, error = null, setFieldValue, onChange = null }) => {
    const { data, isLoading, error: fetchError } = useSWR('/api/auth/role/', fetchRoles)

    const renderRoles = useMemo(() =>
        isLoading ? (
            <div>Loading roles....</div>
        ) : fetchError ? (
            <div className='text-red-500 text-xs'>Failed to fetch roles</div>
        ) : (
            <CustomSelector
                options={parseRoles(data?.roles)}
                selectorValue={parseSelectedRole(selected, data?.roles)}
                handleChange={onChange || (e => setFieldValue('roles', e.value))}
                placeholder='Select Roles'
                isMulti
            />
        )
    )

    return (
        <div className='z-20'>
            <span className='text-xs font-semibold text-[#048c8c]'>Roles*</span>
            {renderRoles}
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default memo(RolesDropdown)
