import { memo } from 'react'
import { toast } from 'react-hot-toast'

import { useMutate } from '@/hooks'
import { Button, Drawer, Input } from '@components'

import { RolesDropdown, CompaniesDropdown, Password } from '@modules/userManagement/components'
import { saveUser } from '@modules/userManagement/api'

import { userSchema } from '@utils/schemas'
import { decodeJwt, getMsg, isSuper } from '@utils/helpers'

const UserForm = ({ show, setShow, mutate, user }) => {
    const loggedUser = decodeJwt()
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/user${user?.id ? `/${user?.id}/` : '/'}`,
        saveUser,
        {
            username: user?.username,
            email: user?.email,
            id: user?.id,
            company: user?.company?.id || loggedUser?.company,
            roles: user?.roles?.id,
            password: '',
        },
        userSchema,
        async formValues => trigger({ ...formValues, id: user?.id }),
        error => toast.error(getMsg(error)),
        () => {
            mutate()
            if (!user?.id) resetForm()
        }
    )
    const allowCompanyEdit = isSuper() && !values.id

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{user?.id ? 'Edit' : 'Create'} User</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Email*</span>
                    <Input name='email' type='email' value={values.email} onChange={handleChange} ph='Enter email' />
                    {errors.email && <small className='ml-1 text-xs text-red-600'>{errors.email}</small>}
                    <span className='text-xs font-semibold'>Username*</span>
                    <Input name='username' value={values.username} onChange={handleChange} ph='Enter username' />
                    {errors.username && <small className='ml-1 text-xs text-red-600'>{errors.username}</small>}
                    <RolesDropdown value={values.roles} error={errors.roles} setFieldValue={setFieldValue} />
                    {allowCompanyEdit && (
                        <CompaniesDropdown
                            value={values.company}
                            error={errors.company}
                            setFieldValue={setFieldValue}
                        />
                    )}
                    <Password value={values.password} error={errors.password} onChange={handleChange} id={user?.id} />
                    <div className='pt-4 space-y-2'>
                        <Button label={user?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(UserForm)
