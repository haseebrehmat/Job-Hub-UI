import { memo } from 'react'
import { toast } from 'react-hot-toast'
import useSWR from 'swr'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea, CustomSelector } from '@components'

import { fetchTechStacks, saveJob } from '@modules/jobsUploader/api'

import { parseJobSource, parseTechKeywords, parseTechKeyword, getMsg } from '@utils/helpers'
import { manualJobSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'
import { JOB_TYPES_OPTIONS, JOB_SOURCE_OPTIONS } from '@constants/scrapper'

const JobForm = ({ show, setShow, mutate }) => {
    const { data, isLoading, error } = useSWR('/api/job_portal/tech_keywords/', fetchTechStacks)
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
            job_description: '',
            tech_keywords: '',
        },
        manualJobSchema,
        async formValues => trigger({ ...formValues }),
        err => toast.error(getMsg(err)),
        () => {
            mutate()
            resetForm()
        }
    )

    const renderTech = isLoading ? (
        <div>Loading tech stacks....</div>
    ) : error ? (
        <div className='text-red-500 text-xs'>Failed to fetch tech stacks</div>
    ) : (
        <CustomSelector
            options={parseTechKeywords(data.techStacks)}
            selectorValue={parseTechKeyword(values.tech_keywords)}
            handleChange={e => setFieldValue('tech_keywords', e.value)}
            placeholder='Select TechStack'
        />
    )

    return (
        <Drawer show={show} setShow={setShow} w='600px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Add Manual Job</p>
                    <hr className='mb-2' />
                    <div className='grid grid-flow-col gap-2'>
                        <div>
                            <Input
                                name='job_title'
                                onChange={handleChange}
                                value={values.job_title}
                                label='Job Title'
                            />
                            {errors.job_title && (
                                <small className='ml-1 text-xs text-red-600'>{errors.job_title}</small>
                            )}
                        </div>
                        <div>
                            <Input
                                name='company_name'
                                onChange={handleChange}
                                value={values.company_name}
                                label='Company'
                            />
                            {errors.company_name && (
                                <small className='ml-1 text-xs text-red-600'>{errors.company_name}</small>
                            )}
                        </div>
                    </div>
                    <div className='grid grid-flow-col gap-2'>
                        <div className='w-72 z-30'>
                            <CustomSelector
                                options={JOB_SOURCE_OPTIONS}
                                selectorValue={parseJobSource(values.job_source)}
                                handleChange={e => setFieldValue('job_source', e.value)}
                                placeholder='Select job source'
                            />
                            {errors.job_source && (
                                <small className='ml-1 text-xs text-red-600'>{errors.job_source}</small>
                            )}
                        </div>
                        <div className='w-72 z-20'>
                            <CustomSelector
                                options={JOB_TYPES_OPTIONS}
                                selectorValue={parseJobSource(values.job_type)}
                                handleChange={e => setFieldValue('job_type', e.value)}
                                placeholder='Select job type'
                            />
                            {errors.job_type && <small className='ml-1 text-xs text-red-600'>{errors.job_type}</small>}
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-2'>
                        <div className='z-20'>
                            {renderTech}
                            {errors.tech_keywords && (
                                <small className='ml-1 text-xs text-red-600'>{errors.tech_keywords}</small>
                            )}
                        </div>
                        <div>
                            <Input
                                name='job_posted_date'
                                type='date'
                                value={values.job_posted_date}
                                onChange={handleChange}
                                max={today}
                            />
                            {errors.job_posted_date && (
                                <small className='ml-1 text-xs text-red-600'>{errors.job_posted_date}</small>
                            )}
                        </div>
                        <div>
                            <Input name='time' type='time' value={values.time} onChange={handleChange} />
                            {errors.time && <small className='ml-1 text-xs text-red-600'>{errors.time}</small>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Input
                                name='job_source_url'
                                onChange={handleChange}
                                value={values.job_source_url}
                                label='Job url'
                                type='url'
                            />
                            {errors.job_source_url && (
                                <small className='ml-1 text-xs text-red-600'>{errors.job_source_url}</small>
                            )}
                        </div>
                        <div>
                            <Input name='address' onChange={handleChange} value={values.address} label='Location' />
                            {errors.location && <small className='ml-1 text-xs text-red-600'>{errors.location}</small>}
                        </div>
                    </div>
                    <Textarea
                        name='job_description'
                        onChange={handleChange}
                        ph='job description'
                        value={values.job_description}
                        label='Job Description'
                    />
                    {errors.job_description && (
                        <small className='ml-1 text-xs text-red-600'>{errors.job_description}</small>
                    )}
                    <div className='pt-4 space-y-2'>
                        <Button label='Post' fill type='submit' disabled={wait} />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(JobForm)
