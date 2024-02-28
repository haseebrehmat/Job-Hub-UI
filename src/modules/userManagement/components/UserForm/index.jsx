import { memo } from 'react'
import { toast } from 'react-hot-toast'
import useSwr from 'swr'

import { useMutate } from '@/hooks'
import { Button, Drawer, Input, SelectBox } from '@components'
import { saveUser, fetchRoles, fetchCompanies } from '@modules/userManagement/api'

import { roleSchema } from '@utils/schemas'
import { getMsg, parseRoles, parseComapnies } from '@utils/helpers'

const UserForm = ({ show, setShow, mutate, user }) => {
    const { data: fetchedRoles, isLoading: rolesLoading } = useSwr('/api/auth/role_association/', fetchRoles)
    const { data: fetchedCompanies, isLoading: companiesLoading } = useSwr('/api/auth/company/', fetchCompanies)
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/user${user?.id ? `/${user?.id}/` : '/'}`,
        saveUser,
        {
            name: user?.name || '',
            username: user?.username || '',
            email: user?.email || '',
            id: user?.id,
            company: user?.company || '',
            role: user?.role || '',
            password: user?.password || '',
        },
        roleSchema,
        async formValues => {
            trigger({ ...formValues, id: user?.id })
            if (!user?.id) resetForm()
        },
        error => toast.error(getMsg(error)),
        () => user?.id && mutate('/api/auth/role_association/')
    )
    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{user?.id ? 'Edit' : 'Create'} User</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Email*</span>
                    <Input name='email' type='email' value={values.email} onChange={handleChange} ph='Enter email' />
                    {errors.email && <small className='ml-1 text-xs text-red-600'>{errors.email}</small>}
                    <span className='text-xs font-semibold'>Username*</span>
                    <Input name='username' value={values.username} onChange={handleChange} ph='Enter username' />
                    {errors.username && <small className='ml-1 text-xs text-red-600'>{errors.username}</small>}
                    {rolesLoading ? (
                        <small className='ml-1 p-3 text-xs text-gray-400'>Roles Loading...</small>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Role*</span>
                            <SelectBox
                                options={parseRoles(fetchedRoles?.roles)}
                                selected={values.role}
                                handleChange={({ value }) => setFieldValue('role', value)}
                                classes='text-gray-500 text-sm'
                            />
                            {errors.role && <small className='ml-1 text-xs text-red-600'>{errors.role}</small>}
                        </>
                    )}
                    {companiesLoading ? (
                        <small className='ml-1 p-3 text-xs text-gray-400'>Companies Loading...</small>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Company*</span>
                            <SelectBox
                                options={parseComapnies(fetchedCompanies?.companies)}
                                selected={values.company}
                                handleChange={({ value }) => setFieldValue('company', value)}
                                classes='text-gray-500 text-sm'
                            />
                            {errors.company && <small className='ml-1 text-xs text-red-600'>{errors.company}</small>}
                        </>
                    )}
                    <span className='text-xs font-semibold'>Password*</span>
                    <Input
                        name='password'
                        type='password'
                        value={values.password}
                        onChange={handleChange}
                        ph='Password'
                    />
                    {errors.password && <small className='ml-1 text-xs text-red-600'>{errors.password}</small>}
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
