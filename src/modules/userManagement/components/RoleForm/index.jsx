import { memo } from 'react'
import { toast } from 'react-hot-toast'
import useSwr from 'swr'

import { Button, Drawer, Input, Textarea } from '@components'
import { saveRole, fetchFixRoles } from '@modules/userManagement/api'

import { useMutate } from '@/hooks'
import { roleSchema } from '@utils/schemas'
import { getMsg, parseFixedRoles, parseSelectedRole } from '@utils/helpers'

import { TrashIcon } from '@icons'
import { SelectBox } from '@/components'

const CompanyForm = ({ show, setShow, mutate, role }) => {
    const { data, isLoading } = useSwr('/api/auth/user_roles/', fetchFixRoles)
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/role_association${role?.id ? `/${role?.id}/` : '/'}`,
        saveRole,
        { name: role?.name || '', code: role?.code || '', description: role?.description || '', id: role?.id },
        roleSchema,
        async formValues => {
            trigger({ ...formValues, id: role?.id })
            if (!role?.id) resetForm()
        },
        error => toast.error(getMsg(error)),
        () => role?.id && mutate('/api/auth/role_association/')
    )

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{role?.id ? 'Edit' : 'Create'} Role</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    {isLoading ? (
                        <small className='ml-1 p-3 text-xs text-gray-400'>Fixed Roles Loading...</small>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Code*</span>
                            <SelectBox
                                options={parseFixedRoles(data?.fixedRoles)}
                                selected={parseSelectedRole(values.code, data?.fixedRoles)}
                                handleChange={({ value }) => setFieldValue('code', value)}
                                classes='text-gray-500 text-sm'
                            />
                            {errors.code && <small className='ml-1 text-xs text-red-600'>{errors.code}</small>}
                        </>
                    )}
                    <span className='text-xs font-semibold'>Description</span>
                    <Textarea name='description' ph='Description' value={values.description} onChange={handleChange} />
                    {errors.description && <small className='ml-1 text-xs text-red-600'>{errors.description}</small>}
                    <div className='pt-4 space-y-2'>
                        <Button label={role?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                        {role?.id && (
                            <Button
                                label='Delete'
                                classes='bg-transparent text-red-500 border-red-500'
                                icon={TrashIcon}
                                onClick={() => setShow(false)}
                            />
                        )}
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(CompanyForm)
