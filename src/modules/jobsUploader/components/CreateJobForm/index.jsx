import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Modal, Input, TextEditor, Checkbox } from '@components'

import { saveJob } from '@modules/jobsUploader/api'
import { CreateFormButtons } from '@modules/jobsUploader/components'
import { JobSourcesDropdown, JobTypesDropdown, TechStacksDropdown } from '@modules/jobsFilter/components'

import { manualJobSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'
import { EDIT_JOB_INPUTS } from '@constants/jobPortal'

const CreateJobForm = ({ show, setShow, mutate }) => {
    const { values, errors, handleChange, handleSubmit, resetForm, trigger, wait, setFieldValue } = useMutate(
        'api/job_portal/manual_jobs/',
        saveJob,
        {
            job_title: '',
            company_name: '',
            job_source: '',
            job_type: '',
            address: '',
            job_posted_date: today,
            time: '',
            job_source_url: '',
            job_description_tags: '',
            tech_keywords: '',
            salary_max: '',
            salary_min: '',
            salary_format: '',
            job_role: '',
            expired: '',
        },
        manualJobSchema,
        async formValues => trigger({ ...formValues }),
        null,
        () => {
            mutate()
            resetForm()
        }
    )

    return (
        <Modal
            classes='!w-4/5'
            show={show}
            setShow={() => setShow(!show)}
            content={
                <div className='w-full'>
                    <p className='font-medium text-xl'>Create Job</p>
                    <hr className='my-2' />
                    <form onSubmit={handleSubmit}>
                        <div className='flex gap-5 items-start'>
                            <div className='grid grid-cols-2 gap-x-2 gap-y-1 w-1/2'>
                                {EDIT_JOB_INPUTS.map(row => (
                                    <div>
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
                                <TechStacksDropdown
                                    value={values.tech_keywords}
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
                                <div className='mt-1.5'>
                                    <Checkbox
                                        label={values.expired ? 'Unmark job as active' : 'Mark job as expired'}
                                        checked={values.expired}
                                        onChange={e => setFieldValue('expired', e.target.checked)}
                                    />
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <span className='font-semibold text-[#048c8c]'>Job Description*</span>
                                <TextEditor
                                    init='Enter your Job description'
                                    value={values.job_description_tags}
                                    onChange={text => setFieldValue('job_description_tags', text)}
                                />
                                {errors.job_description_tags && (
                                    <small className='__error'>{errors.job_description_tags}</small>
                                )}
                            </div>
                        </div>
                        <CreateFormButtons wait={wait} set={() => setShow(!show)} />
                    </form>
                </div>
            }
        />
    )
}

export default memo(CreateJobForm)
