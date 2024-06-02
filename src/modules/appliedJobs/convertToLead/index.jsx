import { memo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Textarea, Input } from '@components'

import { fetchStatusPhases, convertToLead } from '@modules/appliedJobs/api'
import { CandidateSelect } from '@modules/appliedJobs/components'

import { convertToLeadSchema } from '@utils/schemas'
import { parseSelectedStatus, parseStatuses, parseStatusPhases, parseSelectedStatusPhase } from '@utils/helpers'
import { today } from '@constants/dashboard'

import { BackToIcon } from '@icons'

const ConvertToLead = () => {
    const { id } = useParams()
    const redirect = useNavigate()

    const { data, isLoading, error } = useSWR('/api/lead_managament/company_status_phases/', fetchStatusPhases)
    const { values, errors, handleSubmit, trigger, setFieldValue, handleChange } = useMutate(
        `api/lead_managament/leads/`,
        convertToLead,
        { status: '', phase: '', notes: '', effect_date: today, due_date: today, job: id, candidate: '' },
        convertToLeadSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => redirect('/user-applied-jobs')
    )

    const flag = values.status && values.phase && values.candidate
    return (
        <div className='max-w-full overflow-x-auto hide_scrollbar p-4 mt-4'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='grid grid-cols-2 gap-2'>
                        {isLoading ? (
                            <span>Loading...</span>
                        ) : error ? (
                            <span>Error to Load statuses</span>
                        ) : (
                            <>
                                <div>
                                    <span className='text-sm font-semibold'>Status*</span>
                                    <CustomSelector
                                        options={parseStatuses(data)}
                                        handleChange={({ value }) => setFieldValue('status', value)}
                                        selectorValue={parseSelectedStatus(values.status, data)}
                                        placeholder='Select Status'
                                    />
                                    {errors.status && <small className='__error'>{errors.status}</small>}
                                </div>
                                <div>
                                    <span className='text-sm font-semibold'>Phase*</span>
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
                            <span className='text-sm font-semibold'>Effective Date*</span>
                            <Input type='date' onChange={handleChange} name='effect_date' value={values.effect_date} />
                            {errors.effect_date && <small className='__error'>{errors.effect_date}</small>}
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Due Date*</span>
                            <Input type='date' onChange={handleChange} name='due_date' value={values.due_date} />
                            {errors.due_date && <small className='__error'>{errors.due_date}</small>}
                        </div>
                    </div>
                    <div>
                        <span className='text-sm font-semibold'>Notes*</span>
                        <Textarea rows={5} onChange={handleChange} name='notes' value={values.notes} />
                        {errors.notes && <small className='__error'>{errors.notes}</small>}
                    </div>
                </div>
                <CandidateSelect selected={values.candidate} handleSelect={setFieldValue} />
                <div className='py-5 flex space-x-3 float-right'>
                    {flag && <Button label='Save' type='submit' fit fill classes='!px-12' />}
                    <Button
                        label='Back to Applied Jobs'
                        icon={BackToIcon}
                        fit
                        onClick={() => redirect('/user-applied-jobs')}
                        classes='!pr-6 pl-3'
                    />
                </div>
            </form>
        </div>
    )
}

export default memo(ConvertToLead)
