import { memo } from 'react'
import { toast } from 'react-hot-toast'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea, Loading, CustomSelector } from '@components'

import { jobPost } from '@modules/jobsUploader/api'

import { manualJobSchema } from '@utils/schemas'
import { today } from '@constants/dashboard'
import { JOB_TYPE, JOB_SOURCE_OPTIONS } from '@constants/scrapper'
import { getMsg, parseJobSource } from '@utils/helpers'

const JobForm = ({ show, setShow, setInit }) => {
    const { values, errors, handleChange, resetForm, trigger, wait, setFieldValue } = useMutate(
        'api/job_portal/manual_jobs/',
        {
            title: '',
            company: '',
            job_source: '',
            job_type: '',
            address: '',
            job_posted_date: 'da',
            job_source_url: '',
            job_description: 'sdgdfggf',
            tech_keywords: "Java",
        },
        manualJobSchema,
        async formValues => trigger({ ...formValues }),
        error => toast.error(getMsg(error)),
        data => {
            setShow(false)
            resetForm()
        }
    )
    if (wait) return <Loading />
    return (
        <Drawer show={show} setShow={setShow} w='600px'>
            <form onSubmit={(e)=> {
                e.preventDefault();
                jobPost('api/job_portal/manual_jobs/', { job_title: "Ruby on Rails Developer",
                company_name: "Maverics_Company12",
                job_source: "Linkedin",
                job_type: "Full Time on Site",
                address: "DHA Phase 5",
                job_source_url: "http://www.monster.com/job-openings/embedded-test-engineer-orlando-fl--bf2018aa-d32a-4867-81f1-e4669b902c9e?sid=c692423d-baa9-44aa-909b-93b796cab47e&jvo=m.k.sc.1&so=m.s.sh&hidesmr=1&promoted=KEVEL",
                job_posted_date: "2023-03-21 18:51:20.822015",
                job_description: "This is job job_description",
                tech_keywords: "Java"});
                return false;
            }}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Job Posting</p>
                    <hr className='mb-2' />
                    <div className='grid grid-flow-col gap-2'>
                        <div>
                            <Input name='title' onChange={handleChange} value={values.title} label='Title' />{' '}
                            {errors.title && <small className='ml-1 text-xs text-red-600'>{errors.title}</small>}
                        </div>
                        <div>
                            <Input name='company' onChange={handleChange} value={values.company} label='Company' />
                            {errors.company && <small className='ml-1 text-xs text-red-600'>{errors.company}</small>}
                        </div>
                    </div>
                    <div className='grid grid-flow-col gap-2'>
                        <div>
                            <CustomSelector
                                options={JOB_SOURCE_OPTIONS}
                                selectorValue={parseJobSource(values.job_source)}
                                handleChange={values => setFieldValue('job_source', values.value)}
                                placeholder='Select job source'
                            />
                            {errors.job_source && (
                                <small className='ml-1 text-xs text-red-600'>{errors.job_source}</small>
                            )}
                        </div>
                        <div>
                            <CustomSelector
                                options={JOB_TYPE}
                                selectorValue={parseJobSource(values.job_type)}
                                handleChange={values => setFieldValue('job_type', values.value)}
                                placeholder='Select job type'
                            />
                            {errors.job_type && <small className='ml-1 text-xs text-red-600'>{errors.job_type}</small>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Input name='address' onChange={handleChange} value={values.address} label='Address' />{' '}
                            {errors.address && <small className='ml-1 text-xs text-red-600'>{errors.address}</small>}
                        </div>
                        <div className='h-10'>
                            {/* <Input
                                name='job_posted'
                                type='date'
                                value={values.job_posted_date || today}
                                onChange={handleChange}
                                max={today}
                            /> */}
                            {errors.job_posted_date && (
                                <small className='ml-1 text-xs text-red-600'>{errors.job_posted_date}</small>
                            )}
                        </div>
                    </div>
                    <Input
                        name='job_source_url'
                        onChange={handleChange}
                        value={values.job_source_url}
                        label='Job url'
                    />
                    {errors.job_source_url && (
                        <small className='ml-1 text-xs text-red-600'>{errors.job_source_url}</small>
                    )}
                    {/* <Textarea
                        name='job_des'
                        onChange={handleChange}
                        ph='job description'
                        value={values.job_description}
                        label='Job Description'
                    /> */}
                    <div className='pt-4 space-y-2'>
                        <Button label='Post' fill type='submit' />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(JobForm)
