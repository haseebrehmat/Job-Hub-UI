import { memo } from 'react'
import { toast } from 'react-hot-toast'
import useSwr from 'swr'
import CustomSelector from '@components/CustomSelector'
import { Button, Drawer, Input, Textarea, SelectBox } from '@components'
import { saveRole, fetchFixRoles, fetchGroups } from '@modules/userManagement/api'

import { useMutate } from '@/hooks'
import { roleSchema } from '@utils/schemas'
import { getMsg, parseFixedRoles, parseSelectedRole, parseGroups, parseSelectedGroup } from '@utils/helpers'

import { TrashIcon } from '@icons'

const FilterForm = ({ show, setShow, mutate, role }) => {
    const { data: fixedRolesData, isLoading: fetchingRoles } = useSwr('/api/auth/user_roles/', fetchFixRoles)
    const { data: groupsData, isLoading: fetchingGroups } = useSwr('/api/auth/group/', fetchGroups)
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/role_association${role?.id ? `/${role?.id}/` : '/'}`,
        saveRole,
        {
            name: role?.name || '',
            code: role?.code || '',
            group: role?.group || '',
            description: role?.description || '',
            id: role?.id,
        },
        roleSchema,
        async formValues => {
            trigger({ ...formValues, id: role?.id })
            if (!role?.id) resetForm()
        },
        error => toast.error(getMsg(error)),
        () => role?.id && mutate('/api/auth/role_association/')
    )
    console.log(role)

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Filters</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Select Company*</span>
                    <CustomSelector
                        options={[
                            { label: 'a1213', value: 'ali3' },
                            { label: 'abc', value: 'ali' },
                        ]}
                        // handleChange={setTechStack}
                        // selectorValue={techStackSelector}
                        isMulti
                        placeholder='Company'
                    />
                    <span className='text-xs font-semibold'>Select Integration*</span>
                    <CustomSelector
                        options={[
                            { label: 'a1213', value: 'ali3' },
                            { label: 'abc', value: 'ali' },
                        ]}
                        // handleChange={setTechStack}
                        // selectorValue={techStackSelector}
                        isMulti
                        placeholder='Integration'
                    />
                    <div className='pt-4 space-y-2'>
                        <Button label='Search' type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(FilterForm)
