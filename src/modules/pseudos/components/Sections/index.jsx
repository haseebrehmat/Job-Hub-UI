import { memo } from 'react'

import { HidePassIcon, SeePassIcon } from '@icons'
import { Button, Input } from '@/components'

const Sections = ({ hide, setHide, names, setNames }) => {
    const toggleSection = section => {
        setHide({ ...hide, [section]: !hide[section] })
    }
    const handleChange = e => {
        setNames({ ...names, [e.target.name]: e.target.value })
    }
    const handleClick = () => {
        const payload = Object.keys(names).reduce((acc, key) => {
            acc[key] = { name: names[key], status: hide[key] }
            return acc
        }, {})
        console.log(payload)
    }

    return (
        <div className='flex flex-col font-normal'>
            <h2 className='text-lg font-semibold pl-2.5 mt-4'>Sections</h2>
            <div className='border p-2.5 m-2 shadow-md rounded-md'>
                <p>Basic Info</p>
                <hr className='m-1' />
                <div className='flex flex-col ml-1 text-sm'>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input name='name' value={names.name} classes='__input_2' onChange={handleChange} />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('name')}>
                            {hide.name ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input name='address' value={names.address} classes='__input_2' onChange={handleChange} />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('address')}>
                            {hide.address ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input name='portfolio' value={names.portfolio} classes='__input_2' onChange={handleChange} />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('portfolio')}>
                            {hide.portfolio ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input name='email' value={names.email} classes='__input_2' onChange={handleChange} />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('email')}>
                            {hide.email ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input name='phone' value={names.phone} classes='__input_2' onChange={handleChange} />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('phone')}>
                            {hide.phone ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input
                            name='designation'
                            value={names.designation}
                            classes='__input_2'
                            onChange={handleChange}
                        />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('designation')}>
                            {hide.designation ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input name='avatar' value={names.avatar} classes='__input_2' onChange={handleChange} />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('avatar')}>
                            {hide.avatar ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <Input name='hobby' value={names.hobby} classes='__input_2' onChange={handleChange} />
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('hobby')}>
                            {hide.hobby ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                </div>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <Input name='summary' value={names.summary} classes='__input_2' onChange={handleChange} />
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('summary')}>
                    {hide.summary ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <Input name='skill' value={names.skill} classes='__input_2' onChange={handleChange} />
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('skill')}>
                    {hide.skill ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <Input name='experience' value={names.experience} classes='__input_2' onChange={handleChange} />
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('experience')}>
                    {hide.experience ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <Input name='education' value={names.education} classes='__input_2' onChange={handleChange} />
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('education')}>
                    {hide.education ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <Input name='project' value={names.project} classes='__input_2' onChange={handleChange} />
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('project')}>
                    {hide.project ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <Input name='language' value={names.language} classes='__input_2' onChange={handleChange} />
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('language')}>
                    {hide.language ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <Input name='link' value={names.link} classes='__input_2' onChange={handleChange} />
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('link')}>
                    {hide.link ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <Button label='Update' fit classes='!px-6 !py-1 !mx-auto !mt-2' onClick={handleClick} />
        </div>
    )
}

export default memo(Sections)
