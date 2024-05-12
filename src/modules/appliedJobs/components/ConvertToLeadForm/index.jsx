import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector, Textarea } from '@components'

import { saveGenericSkill } from '@modules/pseudos/api'

import { statusSchema } from '@utils/schemas'
import { GENERIC_SKILL_TYPES_OPTIONS } from '@constants/pseudos'

const ConvertToLeadForm = ({ show, setShow, mutate }) => {
    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue, handleChange } = useMutate(
        `/api/profile/generic_skill/`,
        saveGenericSkill,
        { status: '', phase: '', notes: '' },
        statusSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate() && resetForm()
    )

    const flag = values.name.length > 0 && values.status.length > 0
    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Convert to Lead</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Status*</span>
                    <CustomSelector
                        options={GENERIC_SKILL_TYPES_OPTIONS}
                        handleChange={obj => setFieldValue('status', obj)}
                        selectorValue={values.status}
                        placeholder='Select Status'
                    />
                    {errors.status && <small className='__error'>{errors.status}</small>}
                    <span className='text-xs font-semibold'>Phase*</span>
                    <CustomSelector
                        options={GENERIC_SKILL_TYPES_OPTIONS}
                        handleChange={obj => setFieldValue('phase', obj)}
                        selectorValue={values.phase}
                        placeholder='Select Phase'
                    />
                    {errors.phase && <small className='__error'>{errors.phase}</small>}
                    <span className='text-xs font-semibold'>Notes*</span>
                    <Textarea onChange={handleChange} name='notes' value={values.notes} />
                    {errors.notes && <small className='__error'>{errors.notes}</small>}
                    <div className='pt-4 space-y-2'>
                        {flag && <Button label='Save' type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(ConvertToLeadForm)
