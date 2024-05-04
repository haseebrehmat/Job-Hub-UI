import { memo } from 'react'

import { HidePassIcon, SeePassIcon } from '@icons'

const Sections = ({ hide, setHide, names }) => {
    const toggleSection = section => {
        setHide({ ...hide, [section]: !hide[section] })
    }

    return (
        <div className='flex flex-col'>
            <h2 className='text-lg font-semibold pl-2.5 mt-4'>Sections</h2>
            <div className='border p-2.5 m-2 shadow-md rounded-md'>
                <p>Basic Info</p>
                <hr className='m-1' />
                <div className='flex flex-col ml-1 text-sm'>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.name}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('name')}>
                            {hide.name ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.address}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('address')}>
                            {hide.address ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.portfolio}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('portfolio')}>
                            {hide.portfolio ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.email}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('email')}>
                            {hide.email ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.phone}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('phone')}>
                            {hide.phone ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.designation}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('designation')}>
                            {hide.designation ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.avatar}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('avatar')}>
                            {hide.avatar ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                    <div className='flex items-center justify-between my-1.5'>
                        <p>{names.hobby}</p>
                        <span className='ml-3 cursor-pointer' onClick={() => toggleSection('hobby')}>
                            {hide.hobby ? SeePassIcon : HidePassIcon}
                        </span>
                    </div>
                </div>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <p>{names.summary}</p>
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('summary')}>
                    {hide.summary ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <p>{names.skill}</p>
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('skill')}>
                    {hide.skill ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <p>{names.experience}</p>
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('experience')}>
                    {hide.experience ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <p>{names.education}</p>
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('education')}>
                    {hide.education ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <p>{names.project}</p>
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('project')}>
                    {hide.project ? SeePassIcon : HidePassIcon}
                </span>
            </div>
            <div className='border p-2.5 m-2 flex items-center justify-between shadow-md rounded-md'>
                <p>{names.language}</p>
                <span className='ml-3 cursor-pointer' onClick={() => toggleSection('language')}>
                    {hide.language ? SeePassIcon : HidePassIcon}
                </span>
            </div>
        </div>
    )
}

export default memo(Sections)
