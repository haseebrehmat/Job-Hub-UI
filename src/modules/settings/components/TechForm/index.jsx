import { memo, useState } from 'react'

import { useMutate } from '@/hooks'

import { Button, Drawer, Input, Badge, CustomSelector } from '@components'

import { saveTrend } from '@modules/settings/api'

import { parseTechStacks } from '@utils/helpers'

const TechForm = ({ show, setShow, mutate, trend_analytics, tech_stacks_options }) => {
    const [tags, setTags] = useState(
        trend_analytics?.tech_stacks ? parseTechStacks(trend_analytics?.tech_stacks.split(',')) : []
    )
    const { values, handleSubmit, resetForm, trigger, handleChange } = useMutate(
        `api/job_portal/trends_analytics${trend_analytics?.id ? `/${trend_analytics?.id}/` : '/'}`,
        saveTrend,
        { category: trend_analytics?.id ? trend_analytics?.category : '' },
        null,
        async formValues =>
            trigger({ ...formValues, id: trend_analytics?.id, tech_stacks: tags.map(item => item.value).join() }),
        null,
        () => {
            mutate()
            if (!trend_analytics?.id) resetForm()
            if (close) setShow(false)
        }
    )
    const handleTagRemove = tagToRemove => setTags(tags.filter(tag => tag !== tagToRemove))

    return (
        <Drawer show={show} setShow={setShow} w='320px'>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-flow-row gap-2'>
                    <p className='font-medium text-xl'>{trend_analytics?.id ? 'Edit' : 'Create'} Trends Analytics</p>
                    <hr className='mb-2' />
                    <span className='text-xs font-semibold'>Name</span>
                    <Input name='category' value={values.category} onChange={handleChange} ph='Enter Category name' />
                    <span className='text-xs font-semibold'>Tech Stacks</span>
                    <CustomSelector
                        options={parseTechStacks(tech_stacks_options)}
                        handleChange={obj => setTags(obj)}
                        selectorValue={tags}
                        isMulti
                        placeholder='select tech stacks'
                    />
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
                    <div className='pt-4 space-y-2'>
                        <Button label={trend_analytics?.id ? 'Update' : 'Submit'} type='submit' fill />
                        <Button label='Cancel' onClick={() => setShow(false)} />
                    </div>
                </div>
            </form>
        </Drawer>
    )
}

export default memo(TechForm)
