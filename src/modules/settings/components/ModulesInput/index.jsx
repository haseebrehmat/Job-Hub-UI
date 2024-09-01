import { useEffect, useState } from 'react'

import { Input, CustomSelector } from '@components'

import { parseModules, parseModule } from '@/utils/helpers'

const ModuleInput = ({ modules, selectedModule, handleFieldChange, index }) => {
    const [inputValue, setInputValue] = useState(selectedModule || '')
    const [errors, setErrors] = useState('')
    const handleClick = (value, key) => {
        setInputValue(value.label)
        handleFieldChange(index, inputValue, key)
    }
    const handleChange = e => {
        setErrors('')
        setInputValue(e.target.value)
    }
    useEffect(() => {
        if (inputValue?.length > 0) {
            handleFieldChange(index, inputValue, 'module')
        }
    }, [inputValue])

    return (
        <div className=''>
            <div className='flex  gap-3'>
                <div className='w-[55%]'>
                    <CustomSelector
                        options={parseModules(modules)}
                        selectorValue={parseModule(inputValue)}
                        handleChange={module => handleClick(module, 'module')}
                        placeholder='Select Module'
                    />
                </div>
                <div>
                    <Input value={inputValue} onChange={handleChange} ph='Add new module.' />
                    {errors.length > 0 && <small className='__error'>{errors}</small>}
                </div>
            </div>
        </div>
    )
}

export default ModuleInput
