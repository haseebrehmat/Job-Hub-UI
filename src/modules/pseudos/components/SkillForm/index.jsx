import { memo } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector, SliderInput } from '@components'

import { saveSkill, fetchPseudos } from '@modules/pseudos/api'

import { skillSchema } from '@utils/schemas'
import { parseSelectedGenericSkill } from '@utils/helpers'

const SkillForm = ({ show, setShow, mutate, skill, id }) => {
    const { data, error, isLoading } = useSWR(`/api/profile/pseudo/`, fetchPseudos)

    const { values, errors, handleSubmit, resetForm, trigger, handleChange, setFieldValue } = useMutate(
        `/api/profile/skill${skill?.id ? `/${skill?.id}/` : '/'}`,
        saveSkill,
        { vertical_id: id, generic_skill_id: skill?.generic_skill_id || '', level: skill?.level || 0 },
        skillSchema,
        async formValues => trigger({ ...formValues, id: skill?.id }),
        null,
        () => {
            mutate()
            if (!skill?.id) resetForm()
        }
    )
    const flag = values.generic_skill_id.length > 0 && values.level > 0

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{skill?.id ? 'Edit' : 'Create'} Skill</p>
                    <hr className='mb-2' />
                    {isLoading ? (
                        <small className='ml-1 p-3 text-xs text-gray-400'>Generic Skills Loading...</small>
                    ) : error ? (
                        <div>Failed to load generic skill</div>
                    ) : (
                        <>
                            <span className='text-xs font-semibold'>Skill*</span>
                            <CustomSelector
                                options={data.pseudos}
                                handleChange={({ value }) => setFieldValue('generic_skill_id', value)}
                                selectorValue={parseSelectedGenericSkill(values.generic_skill_id)}
                                placeholder='Select Generic Skill'
                            />
                            {errors.generic_skill_id && <small className='__error'>{errors.generic_skill_id}</small>}
                        </>
                    )}
                    <span className='text-xs font-semibold'>Level out of 5*</span>
                    <SliderInput name='level' max={5} value={values.level} onChange={handleChange} />
                    {errors.level && <small className='__error'>{errors.level}</small>}
                    {errors.vertical_id && <small className='__error'>{errors.vertical_id}</small>}
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
