import { memo } from 'react'

import { useMutate } from '@/hooks'

import { Button, Input } from '@components'

import { saveSections } from '@modules/pseudos/api'

import { BASIC_INFO_SECTIONS } from '@constants/pseudos'

import { HidePassIcon, SeePassIcon } from '@icons'

const Sections = ({ hide, setHide, names, setNames, mutate, id }) => {
    const toggleSection = section => setHide({ ...hide, [section]: !hide[section] })
    const handleChange = e => setNames({ ...names, [e.target.name]: e.target.value })

    const { handleSubmit, trigger } = useMutate(
        `api/profile/section_status/${id}/`,
        saveSections,
        {},
        null,
        async () =>
            trigger(
                Object.keys(names).reduce((acc, key) => {
                    acc[key] = { name: names[key], status: hide[key] }
                    return acc
                }, {})
            ),
        null,
        () => mutate()
    )

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-col font-normal'>
                <h2 className='text-lg font-semibold pl-2.5 mt-4'>Sections</h2>
                <div className='border p-2.5 m-2 shadow-md rounded-md'>
                    <p>Basic Info</p>
                    <hr className='m-1' />
                    <div className='flex flex-col ml-1 text-sm'>
                        {BASIC_INFO_SECTIONS.map(item => (
                            <div className='flex items-center justify-between my-1.5' key={item}>
                                <Input name={item} value={names[item]} classes='__input_2' onChange={handleChange} />
                                <span className='ml-3 cursor-pointer' onClick={() => toggleSection(item)}>
                                    {hide[item] ? SeePassIcon : HidePassIcon}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                {Object.keys(names).map(
                    item =>
                        !BASIC_INFO_SECTIONS?.includes(item) && (
                            <div
                                className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'
                                key={item}
                            >
                                <Input name={item} value={names[item]} classes='__input_2' onChange={handleChange} />
                                <span className='ml-3 cursor-pointer' onClick={() => toggleSection(item)}>
                                    {hide[item] ? SeePassIcon : HidePassIcon}
                                </span>
                            </div>
                        )
                )}
                <Button label='Update' fit classes='!px-6 !py-1 !mx-auto !mt-2' type='submit' />
            </div>
        </form>
    )
}

export default memo(Sections)
