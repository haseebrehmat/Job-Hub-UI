import { useMemo, useState } from 'react'

import { Button, Input, Badge } from '@components'

import { AddSkillIcon } from '@icons'

const SkillsInput = ({ value, error = null, set }) => {
    const [tags, setTags] = useState(value)
    const [inputValue, setInputValue] = useState('')

    const handleChange = e => setInputValue(e.target.value)
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
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    useMemo(() => tags.length > 0 && set({ skills: tags }), [value])
    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Skills</span>
            <div className='flex flex-wrap gap-3 items-center'>
                <Input value={inputValue} onChange={handleChange} ph='Add a skill...' />
                <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !px-1' />
                {tags?.length > 0 &&
                    tags.map(tag => (
                        <Badge
                            label={
                                <span className='inline-block items-center'>
                                    <span>{tag}</span>
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
                            key={tag}
                        />
                    ))}
            </div>
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default SkillsInput
