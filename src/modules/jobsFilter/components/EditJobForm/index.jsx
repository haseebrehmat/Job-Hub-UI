import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Modal, Input, TextEditor } from '@components'

import { saveJob } from '@modules/jobsUploader/api'
import { JobSourcesDropdown, JobTypesDropdown, TechStacksDropdown } from '@modules/jobsFilter/components'

import { manualJobSchema } from '@utils/schemas'
import { formatDate5, formatTime } from '@utils/helpers'
import { today } from '@constants/dashboard'

const EditJobForm = ({ job, set, mutate = null }) => {
    const { values, errors, handleChange, handleSubmit, resetForm, trigger, wait, setFieldValue } = useMutate(
        'api/job_portal/manual_jobs/',
        saveJob,
        {
            job_title: job?.data?.job_title,
            company_name: job?.data?.company_name,
            job_source: job?.data?.job_source,
            job_type: job?.data?.job_type,
            address: job?.data?.address,
            job_posted_date: formatDate5(job?.data?.job_posted_date),
            time: formatTime(job?.data?.job_posted_date),
            job_source_url: job?.data?.job_source_url,
            job_description: job?.data?.job_description_tags,
            tech_keywords: job?.data?.tech_keywords,
            salary_max: job?.data?.salary_max,
            salary_min: job?.data?.salary_min,
            salary_format: job?.data?.salary_format,
            job_role: job?.data?.job_role || '',
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
            show={job.show}
            setShow={show => set({ show })}
            content={
                <div className='w-full'>
                    <p className='font-medium text-xl'>Edit Job</p>
                    <hr className='my-2' />
                    <form onSubmit={handleSubmit} className='text-[#048c8c]'>
                        <div className='flex gap-5 items-start'>
                            <div className='grid grid-cols-2 gap-2 w-1/2'>
                                <div>
                                    <span className='text-xs font-semibold'>Job Title*</span>
                                    <Input name='job_title' onChange={handleChange} value={values.job_title} />
                                    {errors.job_title && <small>{errors.job_title}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Company Name*</span>
                                    <Input name='company_name' onChange={handleChange} value={values.company_name} />
                                    {errors.company_name && <small>{errors.company_name}</small>}
                                </div>
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
                                <div>
                                    <span className='text-xs font-semibold'>Job Location*</span>
                                    <Input name='address' onChange={handleChange} value={values.address} />
                                    {errors.address && <small>{errors.address}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Job Posted Date</span>
                                    <Input
                                        name='job_posted_date'
                                        type='date'
                                        value={values.job_posted_date}
                                        onChange={handleChange}
                                        max={today}
                                    />
                                    {errors.job_posted_date && <small>{errors.job_posted_date}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Job Posted Time</span>
                                    <Input name='time' type='time' value={values.time} onChange={handleChange} />
                                    {errors.time && <small>{errors.time}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Job Role</span>
                                    <Input name='job_role' onChange={handleChange} value={values.job_role} />
                                    {errors.job_role && <small>{errors.job_role}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Salary Format</span>
                                    <Input name='salary_format' onChange={handleChange} value={values.salary_format} />
                                    {errors.salary_format && <small>{errors.salary_format}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Maximum Salary</span>
                                    <Input name='salary_max' onChange={handleChange} value={values.salary_max} />
                                    {errors.salary_max && <small>{errors.salary_max}</small>}
                                </div>
                                <div>
                                    <span className='text-xs font-semibold'>Minimum Salary</span>
                                    <Input name='salary_min' onChange={handleChange} value={values.salary_min} />
                                    {errors.salary_min && <small>{errors.salary_min}</small>}
                                </div>
                                <div className='col-span-2'>
                                    <span className='text-xs font-semibold'>Job Source URL*</span>
                                    <Input
                                        name='job_source_url'
                                        onChange={handleChange}
                                        value={values.job_source_url}
                                        type='url'
                                    />
                                    {errors.job_source_url && <small>{errors.job_source_url}</small>}
                                </div>
                            </div>
                            <div className='w-1/2'>
                                <span className='text-xs font-semibold'>Job Description*</span>
                                <TextEditor
                                    init={job?.data?.job_description_tags}
                                    value={values.job_description}
                                    onChange={text => setFieldValue('job_description', text)}
                                />
                                {errors.job_description && <small>{errors.job_description}</small>}
                            </div>
                        </div>
                        <div className='pt-4 flex justify-end gap-2'>
                            <Button label='Cancel' fit onClick={() => set({ show: false })} classes='!px-4' />
                            <Button label='Update' fit fill type='submit' disabled={wait} classes='!px-8' />
                            <Button
                                label='Update & Apply'
                                fit
                                type='submit'
                                disabled={wait}
                                classes='!px-8 bg-gray-100 border-gray-400 text-gray-800 hover:bg-gray-100 hover:!text-[#048c8c] hover:!border-[#048c8c]'
                            />
                        </div>
                    </form>
                </div>
            }
        />
    )
}

export default memo(EditJobForm)
