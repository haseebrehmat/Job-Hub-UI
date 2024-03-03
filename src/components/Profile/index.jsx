import { decodeJwt } from '@/utils/helpers'
import { memo } from 'react'
import { NavContactIcon } from '@icons'

const Profile = () => {
    const user = decodeJwt()

    return (
        <div className='absolute flex items-start justify-between rounded-xl bg-white border border-gray-100 px-4 py-2 shadow-xl right-20'>
            <div className=' text-gray-500'>
                <h3 className='mt-4 text-lg font-bold text-gray-900 sm:text-xl'>{user?.username}</h3>
                <p className='mt-2 hidden text-sm sm:block'>{user?.email}</p>
                <p className='hidden text-sm sm:block'>{user?.role}</p>
            </div>

            <span className='rounded-full pl-10 y-1'>
                <img
                    alt='Paul Clapton'
                    src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg'
                    className='h-16 w-16 rounded-lg object-cover shadow-sm'
                />
            </span>
        </div>
    )
}

export default memo(Profile)
