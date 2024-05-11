import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input } from '@components'

import { saveGenericSkill } from '@modules/pseudos/api'

import { statusSchema } from '@utils/schemas'

const CompanyStatusForm = ({ show, setShow, mutate, status = null }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/generic_skill${status?.id ? `/${status?.id}/` : '/'}`,
        saveGenericSkill,
        { name: status?.name || '' },
        statusSchema,
        async formValues => trigger({ ...formValues, id: status?.id }),
        null,
        () => {
            mutate()
            if (!status?.id) resetForm()
        }
    )
    const flag = values.name.length > 0

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{status?.id ? 'Edit' : 'Create'} Status</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter status name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <div className='pt-4 space-y-2'>
                        {flag && <Button label={status?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(CompanyStatusForm)
