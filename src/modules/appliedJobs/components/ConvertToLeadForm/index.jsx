import { memo } from 'react'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, Drawer, CustomSelector, Textarea, Input } from '@components'

import { fetchStatusPhases } from '@modules/appliedJobs/api'

import { convertToLeadSchema } from '@utils/schemas'
import { parseSelectedStatus, parseStatuses, parseStatusPhases, parseSelectedStatusPhase } from '@utils/helpers'
import { today } from '@constants/dashboard'

const ConvertToLeadForm = ({ show, setShow, mutate }) => {
    const { data, isLoading, error } = useSWR('/api/lead_managament/company_status_phases/', fetchStatusPhases)
    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue, handleChange } = useMutate(
        `/api/profile/generic_skill/`,
        fetchStatusPhases,
        { status: '', phase: '', notes: '', effect_date: today, due_date: today },
        convertToLeadSchema,
        async form => trigger({ ...form }),
        null,
        () => mutate() && resetForm()
    )

    const flag = values.status && values.phase
    return (
        <Drawer show={show} setShow={setShow} w='700px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Convert to Lead</p>
                    <hr className='mb-2' />
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : error ? (
                            <span>Error to Load statuses</span>
                        ) : (
                            <>
                                <div>
                                    <span className='text-xs font-semibold'>Status*</span>
                                    <CustomSelector
                                        options={parseStatuses(data)}
                                        handleChange={({ value }) => setFieldValue('status', value)}
                                        selectorValue={parseSelectedStatus(values.status, data)}
                                        placeholder='Select Status'
                                    />
                                    {errors.status && <small className='__error'>{errors.status}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Phase*</span>
                                    {values.status ? (
                                        <CustomSelector
                                            options={parseStatusPhases(values.status, data)}
                                            handleChange={({ value }) => setFieldValue('phase', value)}
                                            selectorValue={parseSelectedStatusPhase(values.phase, values.status, data)}
                                            placeholder='Select Phase'
                                        />
                                    ) : (
                                        <p className='text-sm mt-2'>Please select status first</p>
                                    )}
                                    {errors.phase && <small className='__error'>{errors.phase}</small>}
                                </div>
                            </>
                        )}
                        <div>
                            <span className='text-xs font-semibold'>Effective Date*</span>
                            <Input type='date' onChange={handleChange} name='effect_date' value={values.effect_date} />
                            {errors.effect_date && <small className='__error'>{errors.effect_date}</small>}
                        </div>
                        <div>
                            <span className='text-xs font-semibold'>Due Date*</span>
                            <Input type='date' onChange={handleChange} name='due_date' value={values.due_date} />
                            {errors.due_date && <small className='__error'>{errors.due_date}</small>}
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
