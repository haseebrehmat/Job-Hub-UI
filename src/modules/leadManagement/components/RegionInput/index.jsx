import { useEffect, useState } from 'react'

import { Button, Input, Badge, CustomSelector } from '@components'

import { parseRegions, findRegion } from '@/utils/helpers'
import { AddSkillIcon } from '@icons'

const RegionInput = ({ value, error = null, set, regions }) => {
    const [tags, setTags] = useState(value ? parseRegions(value) : [])
    const [inputValue, setInputValue] = useState({ label: '', value: '' })

    const handleClick = () => {
        if (inputValue) {
            if (findRegion(inputValue.label, regions)) {
                setTags(tags.filter(tag => tag !== inputValue))
            } else {
                setTags([...tags, inputValue])
                setInputValue({ label: '', value: '' })
            }
        }
    }
    const handleChange = e => {
        setInputValue({ label: e.target.value, value: '' })
    }
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    useEffect(() => {
        set('regions', tags)
    }, [tags])

    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Regions</span>
            <div className='flex flex-col-3 gap-3'>
                <div className='w-[50%]'>
                    <CustomSelector
                        options={parseRegions(regions)}
                        handleChange={obj => setTags(obj)}
                        selectorValue={tags}
                        isMulti
                        placeholder='select regions'
                    />
                </div>
                <Input value={inputValue.label} onChange={handleChange} ph='Add a Region...' />
                <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !p-1 ' />
            </div>
            <div className='flex flex-wrap gap-3 items-center mt-2'>
                {tags?.length > 0 &&
                    tags?.map(tag => (
                        <Badge
                            label={
                                <span className='inline-block items-center'>
                                    <span>{tag.label}</span>
                                    <button
                                        type='button'
                                        onClick={() => handleTagRemove(tag)}
                                        className='ml-2 italic focus:outline-none hover:text-red-700'
                                    >
                                        X
                                    </button>
                                </span>
                            }
                            type='success'
                            classes='border border-green-300'
                            key={tag.value}
                        />
                    ))}
            </div>
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default RegionInput
