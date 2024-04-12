import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input } from '@components'

import { saveSkill } from '@modules/pseudos/api'

import { skillSchema } from '@utils/schemas'
import SliderInput from '@/components/SliderInput'

const SkillForm = ({ show, setShow, mutate, skill, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/skill${skill?.id ? `/${skill?.id}/` : '/'}`,
        saveSkill,
        { vertical_id: id, name: skill?.name || '', level: skill?.level || 0 },
        skillSchema,
        async formValues => trigger({ ...formValues, id: skill?.id }),
        null,
        () => {
            mutate()
            if (!skill?.id) resetForm()
        }
    )
    const flag = values.name.length > 0 && values.level > 0

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{skill?.id ? 'Edit' : 'Create'} Skill</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name*</span>
                    <Input name='name' value={values.name} onChange={handleChange} ph='Enter skill name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Level out of 5*</span>
                    <SliderInput name='level' max={5} value={values.level} onChange={handleChange} />
                    {errors.level && <small className='__error'>{errors.level}</small>}
                    <div className='pt-4 space-y-2'>
                        {flag && <Button label={skill?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(SkillForm)
