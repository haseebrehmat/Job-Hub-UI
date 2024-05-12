import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector, Input } from '@components'

import { saveGenericSkill } from '@modules/pseudos/api'

import { statusSchema } from '@utils/schemas'
import { GENERIC_SKILL_TYPES_OPTIONS } from '@constants/pseudos'

const PhaseForm = ({ phase = null, show, setShow, mutate }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange, setFieldValue } = useMutate(
        `/api/profile/generic_skill${phase?.id ? `/${phase?.id}/` : '/'}`,
        saveGenericSkill,
        { name: phase?.name || '', status: phase?.status || '' },
        statusSchema,
        async formValues => trigger({ ...formValues, id: phase?.id }),
        null,
        () => {
            mutate()
            if (!phase?.id) resetForm()
        }
    )

    const flag = values.name.length > 0 && values.status.length > 0
    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{phase?.id ? 'Edit' : 'Create'} Phase</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter phase name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Status*</span>
                    <CustomSelector
                        options={GENERIC_SKILL_TYPES_OPTIONS}
                        handleChange={obj => setFieldValue('status', obj)}
                        selectorValue={values.status}
                        placeholder='Select Status'
                    />
                    {errors.status && <small className='__error'>{errors.status}</small>}
                    <div className='pt-4 space-y-2'>
                        {flag && <Button label={phase?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(PhaseForm)
