import { memo, useState } from 'react'

import { Button } from '@components'

import { UpdateDetails, UpdatePassword } from '@modules/profile/components'

import { UserIcon, ActionsIcons, UpdatePasswordIcon } from '@icons'

const Profile = () => {
    const [activeTab, setActiveTab] = useState({ avatar: true, details: false, password: false })
    return (
        <div className='p-2'>
            <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
                <div className='flex flex-col mb-4'>
                    <div className='flex flex-row mb-4 md:gap-5'>
                        <Button
                            label='Avatar'
                            fit
                            icon={UserIcon}
                            classes={`md:pr-8 md:pl-6 ${!activeTab.avatar && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ avatar: true, details: false, password: false })}
                        />
                        <Button
                            label='Details'
                            fit
                            icon={ActionsIcons}
                            classes={`md:pr-8 md:pl-6 ${!activeTab.details && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ avatar: false, details: true, password: false })}
                        />
                        <Button
                            label='Update Password'
                            fit
                            icon={UpdatePasswordIcon}
                            classes={`md:pr-8 md:pl-6 ${!activeTab.password && 'border-gray-200'}`}
                            onClick={() => setActiveTab({ avatar: false, details: false, password: true })}
                        />
                    </div>
                    {activeTab.avatar && (
                        <form className='flex items-center space-x-6 mx-auto mt-4'>
                            <div className='shrink-0'>
                                <img
                                    className='h-16 w-16 object-cover rounded-full'
                                    alt='Heelo'
                                    src='https://ui-avatars.com/api/?name=Avatar&background=0D8ABC&color=fff'
                                />
                            </div>
                            <label className='block'>
                                <span className='sr-only'>Choose profile photo</span>
                                <input
                                    type='file'
                                    className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 hover:file:bg-violet-100'
                                />
                            </label>
                        </form>
                    )}
                    {activeTab.details && (
                        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md md:w-1/2 mx-auto mt-4'>
                            <UpdateDetails />
                        </div>
                    )}
                    {activeTab.password && (
                        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md md:w-1/2 mx-auto mt-4'>
                            <UpdatePassword />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(Profile)
