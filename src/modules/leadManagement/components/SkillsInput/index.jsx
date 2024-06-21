import { useEffect, useState } from 'react'

import { Button, Input, Badge, SliderInput } from '@components'

import { AddSkillIcon } from '@icons'

const SkillsInput = ({ value, error = null, set }) => {
    const [tags, setTags] = useState(value)
    const [inputValue, setInputValue] = useState({ name: '', level: 0 })

    const handleSkill = e => {
        if (e.target.value) {
            setInputValue({ ...inputValue, name: e.target.value })
        }
    }

    const handelLevel = ({ target: { value: level } }) => setInputValue({ ...inputValue, level })

    const handleClick = () => {
        setTags([...tags, inputValue])
        setInputValue({ name: '', level: 0 })
    }
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    useEffect(() => {
        set('skills', tags)
    }, [tags])

    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Skills</span>
            <div className='flex flex-wrap gap-3 items-center'>
                <div className='flex flex-col gap-4'>
                    <Input value={inputValue.name} onChange={handleSkill} ph='Add a skill...' />
                    <SliderInput value={inputValue.level} onChange={handelLevel} name='level' max={5} min={0} />
                </div>
                <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !px-1' />
                {tags?.length > 0 &&
                    tags.map(tag => (
                        <Badge
                            label={
                                <span className='inline-block items-center'>
                                    <span>{tag.name}</span>
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
                            key={tag.name}
                        />
                    ))}
            </div>
            {error && <small className='__error'>{error}</small>}
        </div>
    )
}

export default SkillsInput
