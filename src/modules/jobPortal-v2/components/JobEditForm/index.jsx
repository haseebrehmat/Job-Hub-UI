import { memo } from 'react'

import { useMutate } from '@/hooks'

import { useJobPortalV2Store } from '@/stores'

import { Modal, Input, TextEditor, Checkbox, Button } from '@components'

import { updateJob } from '@modules/jobsUploader/api'
import { TechsDropdown } from '@modules/jobPortal-v2/components'
import { JobSourcesDropdown, JobTypesDropdown } from '@modules/jobsFilter/components'

import { manualJobSchema } from '@utils/schemas'
import { can, formatDate5, formatTime, parseSelectedTechs } from '@utils/helpers'
import { EDIT_JOB_INPUTS } from '@constants/jobPortal'

const JobEditForm = () => {
    const [job, show, setShow, mutate] = useJobPortalV2Store(state => [
        state?.job,
        state?.edit,
        state?.setEdit,
        state?.mutator,
    ])

    const { values, errors, handleChange, handleSubmit, trigger, wait, setFieldValue } = useMutate(
        `api/job_portal/job_modification/${job?.id}/`,
        updateJob,
        {
            job_title: job?.job_title,
            company_name: job?.company_name,
            job_source: job?.job_source,
            job_type: job?.job_type,
            address: job?.address,
            job_posted_date: formatDate5(job?.job_posted_date),
            time: formatTime(job?.job_posted_date),
            job_source_url: job?.job_source_url,
            job_description_tags: job?.job_description_tags,
            tech_keywords: parseSelectedTechs(job?.tech_stacks),
            salary_max: job?.salary_max,
            salary_min: job?.salary_min,
            salary_format: job?.salary_format,
            job_role: job?.job_role || '',
            expired: job?.expired_at,
        },
        manualJobSchema,
        async formValues =>
            trigger({ ...formValues, tech_keywords: formValues?.tech_keywords?.map(tech => tech.value)?.join(',') }),
        null,
        () => {
            mutate()
            setShow(false)
        }
    )
    return (
        <Modal
            classes='md:!w-4/5'
            show={show}
            setShow={setShow}
            content={
                <div className='w-full'>
                    <p className='font-medium text-xl'>Edit Job</p>
                    <hr className='my-2' />
                    <form onSubmit={handleSubmit} className='text-[#048c8c]'>
                        <div className='flex flex-col md:flex-row gap-2 md:gap-5 items-start'>
                            <div className='md:grid md:grid-cols-2 space-y-1.5 md:gap-2 md:space-y-0 md:w-1/2'>
                                {EDIT_JOB_INPUTS.map(row => (
                                    <div key={row.name}>
                                        <span className='text-xs font-semibold text-[#048c8c]'>
                                            {row.label}
                                            {row.required ? '*' : ''}
                                        </span>
                                        <Input
                                            name={row.name}
                                            onChange={handleChange}
                                            value={values[row.name]}
                                            type={row.type}
                                            ph={row.ph}
                                        />
                                        {errors[row.name] && <small className='__error'>{errors[row.name]}</small>}
                                    </div>
                                ))}
                                <JobSourcesDropdown
                                    value={values.job_source}
                                    error={errors.job_source}
                                    set={setFieldValue}
                                    onChange={handleChange}
                                />
                                <JobTypesDropdown value={values.job_type} error={errors.job_type} set={setFieldValue} />
                                <TechsDropdown
                                    selected={values.tech_keywords}
                                    error={errors.tech_keywords}
                                    set={setFieldValue}
                                />
                                <div className='col-span-2'>
                                    <span className='text-xs font-semibold text-[#048c8c]'>Job Source URL*</span>
                                    <Input
                                        name='job_source_url'
                                        onChange={handleChange}
                                        value={values.job_source_url}
                                        type='url'
                                        ph='Enter Job Source Link / URL'
                                    />
                                    {errors.job_source_url && (
                                        <small className='__error'>{errors.job_source_url}</small>
                                    )}
                                </div>
                                {can('mark_as_expired') && (
                                    <div className='mt-1.5'>
                                        <Checkbox
                                            label={values.expired ? 'Unmark job as active' : 'Mark job as expired'}
                                            checked={values.expired}
                                            onChange={e => setFieldValue('expired', e.target.checked)}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='w-full md:w-1/2'>
                                <span className='font-semibold text-[#048c8c]'>Job Description*</span>
                                <TextEditor
                                    init={job?.job_description_tags}
                                    value={values.job_description_tags}
                                    onChange={text => setFieldValue('job_description_tags', text)}
                                />
                                {errors.job_description_tags && (
                                    <small className='__error'>{errors.job_description_tags}</small>
                                )}
                            </div>
                        </div>
                        <div className='pt-4 flex justify-end gap-2'>
                            <Button label='Cancel' fit onClick={() => setShow(false)} classes='!px-4' />
                            <Button label='Update' fit fill type='submit' disabled={wait} classes='!px-8' />
                        </div>
                    </form>
                </div>
            }
        />
    )
}

export default memo(JobEditForm)
