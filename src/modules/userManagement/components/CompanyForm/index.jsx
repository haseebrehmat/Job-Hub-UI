import { memo } from 'react'
import { useFormik } from 'formik'
import useSWRMutation from 'swr/mutation'

import { Drawer, Input, Button, Checkbox } from '@/components'
import { companySchema } from '@/utils/schemas'
import { saveCompany } from '../../api'
import { decodeJwt } from '@/utils/helpers'

const CompanyForm = ({ show, setShow, mutate }) => {
    const { trigger, isMutating, error } = useSWRMutation('/api/auth/company/', saveCompany)
    const { user_id } = decodeJwt()

    const { values, errors, handleSubmit, handleChange } = useFormik({
        initialValues: { name: '', code: '', status: true, user: user_id },
        validationSchema: companySchema,
        enableReinitialize: true,
        onSubmit: async formValues => {
            trigger(formValues)
            console.log(error)
            // if (isMutating) {
            //     mutate('/api/auth/company/')
            //     setShow(false)
            // }
        },
    })

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Create Company</p>
                    <hr className='mb-2' />
                    <span className='text-sm'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Name' />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <span className='text-sm'>Code*</span>
                    <Input name='code' value={values.code} onChange={handleChange} ph='Code' />
                    {errors.code && <small className='ml-1 text-xs text-red-600'>{errors.code}</small>}
                    <div className='pt-3 flex flex-col'>
                        <Checkbox name='status' label='Enabled' onChange={handleChange} />
                        {errors.status && <small className='ml-1 text-xs text-red-600'>{errors.status}</small>}
                    </div>
                    <div className='pt-4 space-y-2'>
                        <Button label='Submit' type='submit' fill />
                        <Button label='Cancel' />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(CompanyForm)
