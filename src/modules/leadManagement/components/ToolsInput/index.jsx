import { useEffect, useState } from 'react'

import { Button, Input, Badge } from '@components'

import { AddSkillIcon } from '@icons'

const ToolsInput = ({ value, error = null, set }) => {
    const [tags, setTags] = useState(value)
    const [inputValue, setInputValue] = useState({ tool: '', description: '' })

    const handleTool = e => setInputValue({ ...inputValue, tool: e.target.value })

    const handleDes = e => setInputValue({ ...inputValue, description: e.target.value })

    const handleClick = () => {
        setTags([...tags, inputValue])
        setInputValue({ tool: '', description: '' })
    }

    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))
    useEffect(() => {
        set('tools', tags)
    }, [tags])

    return (
        <div className='mt-2 pb-5'>
            <span className='text-xs font-semibold'>Tools</span>
            <div className='flex flex-wrap gap-3 items-center'>
                <Input value={inputValue.tool} onChange={handleTool} ph='Add a Tool...' />
                <Input value={inputValue.description} onChange={handleDes} ph='Add desription...' />
                <Button icon={AddSkillIcon} fit onClick={handleClick} classes='!rounded-full !px-1' />
                {tags?.length > 0 &&
                    tags.map(tag => (
                        <Badge
                            label={
                                <span className='inline-block items-center'>
                                    <span>{tag.tool}</span>
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

export default ToolsInput
