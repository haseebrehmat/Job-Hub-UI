import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Textarea, Loading } from '@components'

import { generateCoverLetter } from '@modules/coverLetter/api'

import { coverLetterSchema } from '@utils/schemas'


const JobForm = ({ show, setShow, setInit }) => {
    const { values, errors, handleSubmit, handleChange, resetForm, trigger, wait } = useMutate(
        'api/job_portal/cover_letter/generate/',
        generateCoverLetter,
        { name: '', company: '', experience: '', job_des: '' },
        coverLetterSchema,
        async formValues => trigger({ ...formValues }),
        error => toast.error(getMsg(error)),
        data => {
            setInit(data.coverletter)
            setShow(false)
            resetForm()
        }
    )
    if (wait) return <Loading />
    return (

        <Drawer show={show} setShow={setShow} w='480px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>Job Posting</p>
                    <hr className='mb-2' />
                    <div className='grid grid-flow-col gap-2'>
                        <div>
                            <Input
                                name='name'
                                onChange={handleChange}
                                value={values.name}
                                ph='Title'
                                label='Title'
                            />
                            {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                        </div>
                        <div>
                            <Input
                                name='company'
                                onChange={handleChange}
                                value={values.company}
                                ph='Company'
                                label='Company'
                            />
                            {errors.company && <small className='ml-1 text-xs text-red-600'>{errors.company}</small>}
                        </div>
                    </div>
                    <div className='grid grid-flow-col gap-2'>
                        <div>
                            <Input
                                name='job_source'
                                onChange={handleChange}
                                value={values.name}
                                ph='Job Source'
                                label='Job Source'
                            />
                            {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                        </div>
                        <div>
                            <Input
                                name='job_type'
                                onChange={handleChange}
                                value={values.company}
                                ph='Job Type'
                                label='Job Type'
                            />
                            {errors.company && <small className='ml-1 text-xs text-red-600'>{errors.company}</small>}
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div >
                            <Input
                                name='address'
                                onChange={handleChange}
                                value={values.name}
                                ph='address'
                                label='Address'
                            />
                            {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                        </div>
                        <div className='h-10'>
                            <Input
                                name='to_date'
                                type='date'
                                value={""}
                                onChange={handleChange}
                                max={""}
                            />
                            {errors.company && <small className='ml-1 text-xs text-red-600'>{errors.company}</small>}
                        </div>
                    </div>
                    <Input
                        name='job_url'
                        onChange={handleChange}
                        value={values.name}
                        ph='Job url'
                        label='Job url'
                    />
                    {errors.name && <small className='ml-1 text-xs text-red-600'>{errors.name}</small>}
                    <Textarea
                        name='job_des'
                        onChange={handleChange}
                        value={values.job_des}
                        ph='job description'
                        label='Job Description'
                    />
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