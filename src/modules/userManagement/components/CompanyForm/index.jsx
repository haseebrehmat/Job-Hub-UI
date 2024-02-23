import { memo } from 'react'
import { useFormik } from 'formik'
import useSWRMutation from 'swr/mutation'
import { toast } from 'react-hot-toast'

import { Button, Checkbox, Drawer, Input } from '@components'
import { saveCompany } from '@modules/userManagement/api'

import { companySchema } from '@utils/schemas'
import { decodeJwt, getMsg } from '@utils/helpers'

const CompanyForm = ({ show, setShow, mutate }) => {
    const { user_id } = decodeJwt()
    const { trigger } = useSWRMutation('/api/auth/company/', saveCompany, {
        onError: error => toast.error(getMsg(error)),
        onSuccess: () => mutate('/api/auth/company/'),
    })
    const { values, errors, handleSubmit, handleChange, resetForm } = useFormik({
        initialValues: { name: '', status: true, user: user_id },
        validationSchema: companySchema,
        onSubmit: async formValues => {
            trigger(formValues)
            resetForm()
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
