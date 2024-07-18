import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Modal, Tooltip, Input } from '@components'

import { saveJobSourceLink } from '@modules/scrapper/api'

import { parseJobSource } from '@utils/helpers'
import { JOB_SOURCE_OPTIONS } from '@constants/scrapper'

import { ValidateFalseIcon } from '@icons'

const PermissionForm = ({ show, setShow, mutate, link }) => {
    const [fields, setFields] = useState(link?.perms ?? [{ module: '', codename: '', name: '' }])
    const submitButtonShow = fields.length > 0

    const handleFieldChange = (index, value, key) => {
        const newFields = [...fields]
        newFields[index][key] = value
        setFields(newFields)
    }
    const addField = () => setFields([...fields, { module: '', codename: '', name: '' }])
    const removeField = index => setFields(fields.filter((_, i) => i !== index))

    const { handleSubmit, resetForm, trigger } = useMutate(
        `/api/auth/permission/`,
        saveJobSourceLink,
        {},
        null,
        async () => trigger({ perms: fields }),
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
        <Modal
            classes='!w-1/2'
            show={show}
            setShow={setShow}
            content={
                <form onSubmit={handleSubmit} className='w-full hide_scrollbar overflow-x-auto'>
                    <div className='grid grid-flow-row gap-2'>
                        <p className='font-medium text-xl'>{link?.id ? 'Edit' : 'Create'} Permissions</p>
                        <hr className='mb-1 w-full' />
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-[#048C8C]'>Multiple Permission</span>
                            {fields.length < 5 && (
                                <Tooltip text='Add Link'>
                                    <Button onClick={addField} icon='+ Add' fit classes='!px-1 !py-0.5' />
                                </Tooltip>
                            )}
                        </div>
                        <div className='flex flex-col gap-3'>
                            {fields.map((field, index) => (
                                <div key={index} className='grid grid-cols-3 gap-3 items-center w-full'>
                                    <CustomSelector
                                        options={JOB_SOURCE_OPTIONS}
                                        selectorValue={parseJobSource(field.module)}
                                        handleChange={({ value }) => handleFieldChange(index, value, 'module')}
                                        placeholder='Select Module'
                                    />
                                    <Input
                                        ph={`Enter Codename ${index + 1}`}
                                        value={field.codename}
                                        onChange={e => handleFieldChange(index, e.target.value, 'codename')}
                                    />
                                    <div className='flex gap-2 items-center'>
                                        <div className='flex-grow'>
                                            <Input
                                                ph={`Enter Permisssion Name ${index + 1}`}
                                                value={field.name}
                                                onChange={e => handleFieldChange(index, e.target.value, 'name')}
                                            />
                                        </div>
                                        <Tooltip text='Re-move Link'>
                                            <Button
                                                classes='border-0 !text-lg !w-6 !h-6'
                                                icon={ValidateFalseIcon}
                                                onClick={() => removeField(index)}
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='pt-4 space-x-4 text-right'>
                        {submitButtonShow && <Button label={link?.id ? 'Update' : 'Submit'} type='submit' fill fit />}
                        <Button label='Cancel' onClick={() => setShow(false)} fit />
                    </div>
                </form>
            }
        />
    )
}

export default memo(PermissionForm)
