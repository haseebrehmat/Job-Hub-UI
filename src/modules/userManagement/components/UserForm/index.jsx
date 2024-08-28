import { memo, useState } from 'react'

import { useMutate } from '@/hooks'
import { Button, Drawer, Input } from '@components'

import { RolesDropdown, CompaniesDropdown, Password } from '@modules/userManagement/components'
import { saveUser } from '@modules/userManagement/api'
import { RegionsDropdown } from '@modules/pseudos/components'

import { userCreateSchema, userSchema } from '@utils/schemas'
import { decodeJwt, isSuper } from '@utils/helpers'

const UserForm = ({ show, setShow, mutate, user }) => {
    const loggedUser = decodeJwt()
    const [regions, setRegions] = useState(user?.regions || [])

    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/user${user?.id ? `/${user?.id}/` : '/'}`,
        saveUser,
        {
            username: user?.username,
            email: user?.email,
            id: user?.id,
            company: user?.company?.id || loggedUser?.company,
            roles: user?.roles || null,
            password: '',
        },
        user?.id ? userSchema : userCreateSchema,
        async formValues =>
            trigger({
                ...formValues,
                id: user?.id,
                regions: regions.map(r => r.value).join(','),
                roles: formValues?.roles?.map(r => r.value).join(','),
            }),
        null,
        () => {
            mutate()
            if (!user?.id) {
                resetForm()
                setRegions([])
            }
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
                    <RolesDropdown
                        value={values.roles}
                        error={errors.roles}
                        onChange={obj => setFieldValue('roles', obj)}
                        options={{ multi: !isSuper() }}
                    />
                    {allowCompanyEdit ? (
                        <CompaniesDropdown
                            value={values.company}
                            error={errors.company}
                            setFieldValue={setFieldValue}
                        />
                    ) : (
                        <>
                            <RegionsDropdown value={regions} set={setRegions} />
                            {user?.verticals?.length > 0 && (
                                <small className='-mt-5 px-1'>
                                    <span className='font-bold text-red-500'>Warning: </span>
                                    By changing above selected regions,
                                    <span className='font-bold'> assigned verticals can be removed.</span>
                                </small>
                            )}
                        </>
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
