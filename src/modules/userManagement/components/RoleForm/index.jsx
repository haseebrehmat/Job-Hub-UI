import { memo } from 'react'
import { toast } from 'react-hot-toast'

import { Button, Drawer, Input, Textarea } from '@components'
import { saveCompany } from '@modules/userManagement/api'

import { useMutate } from '@/hooks'
import { companySchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'

import { TrashIcon } from '@icons'

const CompanyForm = ({ show, setShow, mutate, company }) => {
    const { values, errors, handleSubmit, handleChange, resetForm, trigger } = useMutate(
        `/api/auth/company${company?.id ? `/${company?.id}/` : '/'}`,
        saveCompany,
        { name: company?.name || '' },
        companySchema,
        async formValues => {
            trigger({ ...formValues, id: company?.id })
            if (!company?.id) resetForm()
        },
        error => toast.error(getMsg(error)),
        () => company?.id && mutate('/api/auth/company')
    )

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{company?.id ? 'Edit' : 'Create'} Role</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Code*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Code' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Description</span>
                    <Textarea name='description' ph='Description' value={values.name} onChange={handleChange} />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <div className='pt-4 space-y-2'>
                        <Button label={company?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                        {company?.id && (
                            <Button
                                label='Delete'
                                classes='bg-red-500 text-white border-red-500'
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
