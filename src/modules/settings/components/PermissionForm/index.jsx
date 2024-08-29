import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, CustomSelector, Modal, Tooltip, Input } from '@components'

import { savePermission } from '@modules/settings/api'

import { parseModule } from '@utils/helpers'
import { MODULE_NAMES_OPTIONS } from '@constants/permissions'

import { ValidateFalseIcon } from '@icons'

const PermissionForm = ({ show, setShow, mutate, permission }) => {
    const [fields, setFields] = useState(
        permission[0]?.id ? permission : [{ module: '', codename: '', name: '', level: '', id: '' }]
    )
    const submitButtonShow = fields.length > 0

    const handleFieldChange = (index, value, key) => {
        const newFields = [...fields]
        newFields[index][key] = value
        setFields(newFields)
    }
    const addField = () => setFields([...fields, { module: '', codename: '', name: '', level: '', id: '' }])
    const removeField = index => setFields(fields.filter((_, i) => i !== index))

    const { handleSubmit, resetForm, trigger } = useMutate(
        `/api/auth/permission${permission[0]?.id ? `/${permission[0]?.id}/` : '/'}`,
        savePermission,
        {
            module: permission[0]?.module || '',
            codename: permission[0]?.codename || '',
            name: permission[0]?.name || '',
            level: permission[0]?.level || '',
            id: permission[0]?.id || '',
        },
        null,
        async () => trigger({ permissions: fields }),
        null,
        () => {
            mutate()
            if (!permission[0]?.id) {
                resetForm()
                setShow(false)
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
                        <p className='font-medium text-xl'>{permission[0]?.id ? 'Edit' : 'Create'} Permissions</p>
                        <hr className='mb-1 w-full' />
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-[#048C8C]'>Multiple Permission</span>
                            {fields.length < 5 && !permission[0]?.id && (
                                <Tooltip text='Add Link'>
                                    <Button onClick={addField} icon='+ Add' fit classes='!px-1 !py-0.5' />
                                </Tooltip>
                            )}
                        </div>
                        <div className='flex flex-col gap-3'>
                            {fields?.map((field, index) => (
                                <div>
                                    <div key={index} className='grid grid-cols-4 gap-2 items-center w-full'>
                                        <CustomSelector
                                            options={MODULE_NAMES_OPTIONS}
                                            selectorValue={parseModule(field?.module)}
                                            handleChange={({ value }) => handleFieldChange(index, value, 'module')}
                                            placeholder='Select Module'
                                        />

                                        <div className='flex-grow'>
                                            <Input
                                                ph={`Enter Codename ${index + 1}`}
                                                value={field?.codename}
                                                onChange={e => handleFieldChange(index, e.target.value, 'codename')}
                                            />
                                        </div>
                                        <div className='flex-grow'>
                                            <Input
                                                ph={`Enter Name ${index + 1}`}
                                                value={field?.name}
                                                onChange={e => handleFieldChange(index, e.target.value, 'name')}
                                            />
                                        </div>
                                        <div className='flex-grow'>
                                            <Input
                                                ph='Enter level'
                                                value={field?.level}
                                                onChange={e => handleFieldChange(index, e.target.value, 'level')}
                                            />
                                        </div>
                                    </div>
                                    {!permission[0]?.id && (
                                        <Tooltip text='Re-move Link'>
                                            <Button
                                                classes='border-0 !text-lg !w-6 !h-6 flex justify-end'
                                                icon={ValidateFalseIcon}
                                                onClick={() => removeField(index)}
                                            />
                                        </Tooltip>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='pt-4 space-x-4 text-right'>
                        {submitButtonShow && (
                            <Button label={permission[0]?.id ? 'Update' : 'Submit'} type='submit' fill fit />
                        )}
                        <Button label='Cancel' onClick={() => setShow(false)} fit />
                    </div>
                </form>
            }
        />
    )
}

export default memo(PermissionForm)
