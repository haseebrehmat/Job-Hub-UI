import { memo } from 'react'
import { UpdateDetails, UpdatePassword } from './components'

const Profile = () => (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
            <h1>Avatar Uploader</h1>
        </div>
        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
            <UpdateDetails />
        </div>
        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
            <UpdatePassword />
        </div>
    </div>
)

export default memo(Profile)
