import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Drawer, Tooltip, Textarea } from '@components'
import { GroupsDropDown } from '@modules/scrapper/components'
import { saveGroupLink } from '@modules/scrapper/api'

import { parseJobType, parseJobSource } from '@utils/helpers'

import { JOB_SOURCE_OPTIONS, JOB_TYPES_OPTIONS } from '@constants/scrapper'

import { ValidateFalseIcon } from '@icons'

const GroupLinksForm = ({ show, setShow, mutate, link }) => {
    const [fields, setFields] = useState(link?.queries ?? [{ link: '', job_type: '', job_source: '' }])
    const submitButtonShow =
        fields.length > 0 && fields.every(field => field.link.length > 0 && field.job_type.length > 0)

    const handleFieldChange = (index, value, select = false, source = false) => {
        const newFields = [...fields]
        newFields[index][select ? 'job_type' : source ? 'job_source' : 'link'] = value
        setFields(newFields)
    }
    const addField = () => setFields([...fields, { link: '', job_type: '', job_source: '' }])
    const removeField = index => setFields(fields.filter((_, i) => i !== index))

    const { values, errors, handleSubmit, resetForm, trigger, setFieldValue } = useMutate(
        `/api/job_scraper/group_scheduler_link${link?.id ? `/${link?.id}/` : '/'}`,
        saveGroupLink,
        { id: link?.id, group_scraper: link?.group_scraper || '' },
        null,
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
                    <p className='font-medium text-xl'>{link?.id ? 'Edit' : 'Create'} Group Link / URL</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Scrapper Group*</span>
                    {'edit_job_source_link' && (
                        <GroupsDropDown value={values.group} error={errors.group} setFieldValue={setFieldValue} />
                    )}
                    {errors.job_source && <small className='ml-1 text-xs text-red-600'>{errors.job_source}</small>}
                    <div className='flex items-center justify-between my-2'>
                        <p>Links</p>
                        {fields.length < 30 && (
                            <Tooltip text='Add Link'>
                                <Button onClick={addField} icon='+' classes='!px-1 !py-0.5' />
                            </Tooltip>
                        )}
                    </div>
                    {fields.map((field, index) => (
                        <div key={index} className='flex flex-col space-y-2'>
                            <div className='flex items-center my-1'>
                                <Textarea
                                    rows={2}
                                    ph={`Enter URL ${index + 1}`}
                                    value={field.link}
                                    required
                                    classes='mr-1'
                                    onChange={e => handleFieldChange(index, e.target.value)}
                                />
                                <Tooltip text='Re-move Link'>
                                    <Button
                                        classes='border-0 !text-lg !w-6 !h-6'
                                        icon={ValidateFalseIcon}
                                        onClick={() => removeField(index)}
                                    />
                                </Tooltip>
                            </div>
                            <CustomSelector
                                options={JOB_TYPES_OPTIONS}
                                selectorValue={parseJobType(field.job_type)}
                                handleChange={({ value }) => handleFieldChange(index, value, true)}
                                placeholder='Select job type'
                                required
                            />
                            <CustomSelector
                                options={JOB_SOURCE_OPTIONS}
                                selectorValue={parseJobSource(field.job_source)}
                                handleChange={({ value }) => handleFieldChange(index, value, false, true)}
                                placeholder='Select job source'
                                required
                            />
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

export default memo(GroupLinksForm)
