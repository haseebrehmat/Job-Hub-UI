import { memo } from 'react'
import useSWR from 'swr'
import { toast } from 'react-hot-toast'

import { Loading, Button } from '@components'

import { fetchProfile, updateProfile } from '@modules/profile/api'

import { useMutate } from '@/hooks'

import { profileSchema } from '@utils/schemas'
import { getMsg } from '@utils/helpers'

const UpdateAvatar = () => {
    const { data, isLoading } = useSWR('/api/auth/user_profile/', fetchProfile)
    const { values, errors, handleSubmit, handleChange, trigger } = useMutate(
        '/api/auth/user_profile/',
        updateProfile,
        { file: data?.profile?.file || null },
        profileSchema,
        async formValues => trigger({ ...formValues }),
        error => toast.error(getMsg(error))
    )

    if (isLoading) return <Loading />

    return (
        <form onSubmit={handleSubmit} className='text-[#328d8c] flex items-center space-x-6 mx-auto mt-4'>
            <h1 className='mb-2 text-lg font-medium'>Avatar upload</h1>
            <hr className='mb-5' />
            <div className='grid grid-flow-row gap-2'>
                <div className='shrink-0'>
                    <img
                        className='h-16 w-16 object-cover rounded-full'
                        alt='Avatar'
                        src={values.file ?? 'https://ui-avatars.com/api/?name=Avatar&background=0D8ABC&color=fff'}
                    />
                </div>
                <label className='block'>
                    <span className='sr-only'>Choose profile photo</span>
                    <input
                        type='file'
                        onChange={handleChange}
                        className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 hover:file:bg-violet-100'
                    />
                </label>
                {errors.file && <small className='ml-1 text-xs text-red-600'>{errors.file}</small>}
                <div className='pt-4 text-end'>
                    <Button label='Update' type='submit' fit classes='px-6' />
                </div>
            </div>
        </form>
    )
}

export default memo(UpdateAvatar)
