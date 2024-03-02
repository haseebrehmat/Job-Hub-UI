import { memo, useState } from 'react'
import { toast } from 'react-hot-toast'
// import useSwr from 'swr'

import { Button, Drawer, Input } from '@components'
import { saveRole } from '@modules/userManagement/api'

import { useMutate } from '@/hooks'
import { roleSchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'

import { TrashIcon } from '@icons'
import Permissions from '../Permissions'

const CompanyForm = ({ show, setShow, mutate, role }) => {
    const [permissions, setPermissions] = useState([1, 2, 4])
    const { values, errors, handleSubmit, handleChange, resetForm, trigger } = useMutate(
        `/api/auth/role_association${role?.id ? `/${role?.id}/` : '/'}`,
        saveRole,
        role,
        roleSchema,
        async formValues => trigger({ ...formValues, id: role?.id, permissions }),
        error => toast.error(getMsg(error)),
        () => (role?.id ? mutate('/api/auth/role_association/') : resetForm())
    )
    return (
        <Drawer show={show} setShow={setShow} w='500px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{role?.id ? 'Edit' : 'Create'} Role</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <Permissions permissions={permissions} setPermissions={setPermissions} />
                    <div className='pt-2 grid grid-cols-3 gap-3'>
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
