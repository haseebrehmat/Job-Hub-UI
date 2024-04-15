import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Drawer, Tooltip, Textarea } from '@components'

import { saveJobSourceLink } from '@modules/scrapper/api'

import { parseJobSource } from '@utils/helpers'
import { jobSourceLinkSchema } from '@utils/schemas'
import { JOB_SOURCE_OPTIONS } from '@constants/scrapper'

import { ValidateFalseIcon } from '@icons'

const JobSourceLinkForm = ({ show, setShow, mutate, link }) => {
    const [fields, setFields] = useState(link?.queries?.map(({ link: queryLink }) => queryLink) ?? [''])
    const submitButtonShow = fields.length > 0 && fields.every(field => field.length > 0)

    const handleFieldChange = (index, event) => {
        const newFields = [...fields]
        newFields[index] = event.target.value
        setFields(newFields)
    }
    const addField = () => setFields([...fields, ''])
    const removeField = index => setFields(fields.filter((_, i) => i !== index))

    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/job_source_link${link?.id ? `/${link?.id}/` : '/'}`,
        saveJobSourceLink,
        { id: link?.id, job_source: link?.job_source || '' },
        jobSourceLinkSchema,
        async formValues => trigger({ ...formValues, id: link?.id, queries: fields }),
        null,
        () => {
            mutate()
            if (!link?.id) {
                resetForm()
                setFields([])
            }
        }
    )

    return (
        <Drawer show={show} setShow={setShow} w='400px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{link?.id ? 'Edit' : 'Create'} Job Source Link / URL</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Job Source*</span>
                    <CustomSelector
                        options={JOB_SOURCE_OPTIONS}
                        selectorValue={parseJobSource(values.job_source)}
                        handleChange={({ value }) => setFieldValue('job_source', value)}
                        placeholder='Select job source'
                    />
                    {errors.job_source && <small className='ml-1 text-xs text-red-600'>{errors.job_source}</small>}
                    <div className='flex items-center justify-between my-2 w-'>
                        <p>Links</p>
                        {fields.length < 30 && (
                            <Tooltip text='Add Link'>
                                <Button onClick={addField} icon='+' classes='!px-1 !py-0.5' />
                            </Tooltip>
                        )}
                    </div>
                    {fields.map((field, index) => (
                        <div key={index} className='flex items-center justify-between my-1'>
                            <Textarea
                                rows={2}
                                ph={`Enter URL ${index + 1}`}
                                value={field}
                                required
                                classes='mr-1'
                                onChange={e => handleFieldChange(index, e)}
                            />
                            <Tooltip text='Re-move Link'>
                                <Button
                                    classes='border-0 !text-lg !w-6 !h-6'
                                    icon={ValidateFalseIcon}
                                    onClick={() => removeField(index)}
                                />
                            </Tooltip>
                        </div>
                    ))}
                    <div className='pt-4 space-y-2'>
                        {submitButtonShow && <Button label={link?.id ? 'Update' : 'Submit'} type='submit' fill />}
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(JobSourceLinkForm)
