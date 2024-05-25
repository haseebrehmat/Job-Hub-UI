import { memo } from 'react'

import { useMutate } from '@/hooks'
import { Button, Modal, Input } from '@components'

import { DesignationSelect, SkillsInput } from '@modules/leadManagement/components'
import { Password } from '@modules/userManagement/components'
import { saveUser } from '@modules/userManagement/api'

import { userCreateSchema, userSchema } from '@utils/schemas'
import { CANDIDATE_INPUTS } from '@constants/leadManagement'

const CandidateForm = ({ show, setShow, mutate, candidate }) => {
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, setFieldValue } = useMutate(
        `/api/auth/user${candidate?.id ? `/${candidate?.id}/` : '/'}`,
        saveUser,
        {
            name: candidate?.name || '',
            email: candidate?.email || '',
            phone: candidate?.phone || '',
            id: candidate?.id || '',
            password: '',
            desgination: candidate?.desgination?.id || '',
            skills: candidate?.skills || [],
            experience: candidate?.experience || 1,
        },
        candidate?.id ? userSchema : userCreateSchema,
        async formValues => trigger({ ...formValues, id: candidate?.id }),
        null,
        () => {
            mutate()
            if (!candidate?.id) resetForm()
        }
    )
    return (
        <Modal
            classes='md:!w-[40%] overflow-y-auto'
            show={show}
            setShow={setShow}
            content={
                <form onSubmit={handleSubmit} className='w-full'>
                    <p className='font-medium text-xl'>{candidate?.id ? 'Edit' : 'Create'} Candidate</p>
                    <hr className='my-2' />
                    <div className='grid grid-cols-2 gap-2'>
                        <DesignationSelect value={values.desgination} error={errors.desgination} set={setFieldValue} />
                        {CANDIDATE_INPUTS.map((input, idx) => (
                            <div key={idx}>
                                <span className='text-xs font-semibold'>
                                    {input.label}
                                    {input.required ? '*' : null}
                                </span>
                                <Input
                                    name={input.name}
                                    type={input.type}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                    ph={input.ph}
                                    step={input?.step}
                                />
                                {errors[input.name] && <small className='__error'>{errors[input.name]}</small>}
                            </div>
                        ))}
                        <div>
                            <Password
                                value={values.password}
                                error={errors.password}
                                onChange={handleChange}
                                id={candidate?.id}
                            />
                        </div>
                    </div>
                    <SkillsInput value={values.skills} error={errors.skills} set={setFieldValue} />
                    <div className='pt-4 gap-2 flex items-center float-right'>
                        <Button label={candidate?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </form>
            }
        />
    )
}

export default memo(CandidateForm)
