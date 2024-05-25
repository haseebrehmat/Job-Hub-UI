import { memo } from 'react'

import { useMutate } from '@/hooks'

import { CustomSelector, Button, Input } from '@components'
import { changeLeadStatus } from '@modules/leadManagement/api'

import { parseStatusPhases, parseSelectedStatusPhase } from '@utils/helpers'
import { convertToLeadSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'

const UpdatePhase = ({ lead = null, status = null, error = null, loading = true, mutate }) => {
    const { values, errors, handleSubmit, trigger, setFieldValue, handleChange } = useMutate(
        `api/lead_managament/leads/${lead?.id}/`,
        changeLeadStatus,
        {
            status: lead?.company_status?.id,
            phase: lead?.phase?.id || '',
            effect_date: lead?.effect_date ?? today,
            due_date: lead?.due_date ?? today,
        },
        convertToLeadSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => mutate()
    )

    return lead ? (
        <div className='border p-2'>
            <p className='text-lg'>Update Phase</p>
            <hr />
            <form onSubmit={handleSubmit} className='flex flex-col mt-2 p-1 gap-2 text-sm text-cyan-700'>
                {loading ? (
                    <span>Loading...</span>
                ) : error ? (
                    <span>Error to Load phases</span>
                ) : (
                    <div>
                        <span className='text-xs font-semibold'>Phase*</span>
                        <CustomSelector
                            options={parseStatusPhases(lead?.company_status?.id, status)}
                            handleChange={({ value }) => setFieldValue('phase', value)}
                            selectorValue={parseSelectedStatusPhase(values.phase, lead?.company_status?.id, status)}
                            placeholder='Select Phase'
                        />
                        {errors.phase && <small className='__error'>{errors.phase}</small>}
                    </div>
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
                <Button label='Update' type='submit' />
            </form>
        </div>
    ) : null
}

export default memo(UpdatePhase)
