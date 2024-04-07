import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea } from '@components'

import { saveSkill } from '@modules/pseudos/api'

import { skillSchema } from '@utils/schemas'

const ExperienceForm = ({ show, setShow, mutate, skill, id }) => {
    const { values, errors, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `/api/profile/skill${skill?.id ? `/${skill?.id}/` : '/'}`,
        saveSkill,
        { vertical_id: id, company_name: skill?.company_name || '' },
        skillSchema,
        async formValues => trigger({ ...formValues, id: skill?.id }),
        null,
        () => {
            mutate()
            if (!skill?.id) resetForm()
        }
    )
    const flag = values.company_name.length > 0

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{skill?.id ? 'Edit' : 'Create'} Skill</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Company Name*</span>
                    <Input
                        name='company_name'
                        value={values.company_name}
                        onChange={handleChange}
                        ph='Enter Company name'
                    />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Designation*</span>
                    <Input name='name' value={values.company_name} onChange={handleChange} ph='Enter skill name' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Start Date*</span>
                    <Input
                        name='name'
                        type='date'
                        value={values.company_name}
                        onChange={handleChange}
                        ph='Enter skill name'
                    />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>End Date*</span>
                    <Input
                        name='name'
                        type='date'
                        value={values.company_name}
                        onChange={handleChange}
                        ph='Enter skill name'
                    />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <span className='text-xs font-semibold'>Description*</span>
                    <Textarea name='name' value={values.company_name} onChange={handleChange} ph='Enter description' />
                    {errors.name && <small className='__error'>{errors.name}</small>}
                    <div className='pt-4 space-y-2'>
                        {flag && <Button label={skill?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(ExperienceForm)
