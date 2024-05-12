import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector, Textarea } from '@components'

import { saveGenericSkill } from '@modules/pseudos/api'

import { convertToLeadSchema } from '@utils/schemas'
import { GENERIC_SKILL_TYPES_OPTIONS } from '@constants/pseudos'

const ConvertToLeadForm = ({ show, setShow, mutate }) => {
    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue, handleChange } = useMutate(
        `/api/profile/generic_skill/`,
        saveGenericSkill,
        { status: '', phase: '', notes: '' },
        convertToLeadSchema,
        async form => trigger({ status: form.status.value, phase: form.phase.value, notes: form.notes }),
        null,
        () => mutate() && resetForm()
    )

    const flag = values.status?.value?.length > 0 && values.phase?.value?.length > 0
    return (
        <Drawer show={show} setShow={setShow} w='700px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Convert to Lead</p>
                    <hr className='mb-2' />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        <div>
                            <span className='text-xs font-semibold'>Status*</span>
                            <CustomSelector
                                options={GENERIC_SKILL_TYPES_OPTIONS}
                                handleChange={obj => setFieldValue('status', obj)}
                                selectorValue={values.status}
                                placeholder='Select Status'
                            />
                            {errors.status && <small className='__error'>{errors.status}</small>}
                        </div>
                        <div>
                            <span className='text-xs font-semibold'>Phase*</span>
                            <CustomSelector
                                options={GENERIC_SKILL_TYPES_OPTIONS}
                                handleChange={obj => setFieldValue('phase', obj)}
                                selectorValue={values.phase}
                                placeholder='Select Phase'
                            />
                            {errors.phase && <small className='__error'>{errors.phase}</small>}
                        </div>
                    </div>
                    <span className='text-xs font-semibold'>Notes*</span>
                    <Textarea onChange={handleChange} name='notes' value={values.notes} />
                    {errors.notes && <small className='__error'>{errors.notes}</small>}
                    <div className='py-4 grid grid-cols-2 gap-3'>
                        {flag && <Button label='Save' type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(ConvertToLeadForm)
