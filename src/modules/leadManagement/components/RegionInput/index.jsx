import { useEffect, useState } from 'react'

import { Button, Input, Badge, CustomSelector } from '@components'

import { parseRegions } from '@/utils/helpers'
import { AddSkillIcon } from '@icons'

const RegionInput = ({ value, error = null, set, regions }) => {
    const [tags, setTags] = useState(value ? parseRegions(value) : [])
    const [inputValue, setInputValue] = useState('')

    const handleClick = () => {
        if (inputValue) {
            if (tags.includes(inputValue)) {
                setTags(tags.filter(tag => tag !== inputValue))
            } else {
                setTags([...tags, inputValue])
                setInputValue('')
            }
        }
    }
    const handleChange = e => {
        setInputValue(e.target.value)
    }
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    useEffect(() => {
        set('regions', tags)
    }, [tags])

    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Regions</span>
            <div className='flex flex-col-3'>
                <Input value={inputValue} onChange={handleChange} ph='Add a Region...' />
                <CustomSelector
                    options={parseRegions(regions)}
                    handleChange={obj => setTags(obj)}
                    selectorValue={tags}
                    isMulti
                    placeholder='select regions'
                />
                <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !px-1' />
            </div>
            <div className='flex flex-wrap gap-3 items-center mt-2'>
                <div>
                    {tags?.length > 0 &&
                        tags?.map(tag => (
                            <span
                                key={tag.value}
                                className='inline-block  my-2 px-2.5 py-1.5 text-sm font-semibold bg-gray-200 rounded-full items-center mx-1'
                            >
                                <span>{tag.label}</span>
                                <button
                                    type='button'
                                    onClick={() => handleTagRemove(tag)}
                                    className='ml-2 text-gray-700 font-semibold focus:outline-none hover:text-red-700'
                                >
                                    x
                                </button>
                            </span>
                        ))}
                </div>
            </div>
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default RegionInput
