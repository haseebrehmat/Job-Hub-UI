import { memo } from 'react'

import { Tabs } from 'flowbite-react'

import { UpdateDetails, UpdatePassword } from '@modules/profile/components'

import { UserIcon, ActionsIcons, UpdatePasswordIcon } from '@/assets/icons'

const Profile = () => (
    <div className='p-2'>
        <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md'>
            <Tabs.Group aria-label='Default tabs' className='mb-4 gap-3' style='pills'>
                <Tabs.Item active title='Avatar' icon={() => <span className='mr-2'>{UserIcon}</span>}>
                    Avatar content
                </Tabs.Item>
                <Tabs.Item title='Details' icon={() => <span className='mr-2'>{ActionsIcons}</span>}>
                    <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md w-1/2 mx-auto mt-4'>
                        <UpdateDetails />
                    </div>
                </Tabs.Item>
                <Tabs.Item title='Update Password' icon={() => <span className='mr-2'>{UpdatePasswordIcon}</span>}>
                    <div className='p-4 border border-[#71dfd0] rounded-lg shadow-md w-1/2 mx-auto mt-4'>
                        <UpdatePassword />
                    </div>
                </Tabs.Item>
            </Tabs.Group>
        </div>
    </div>
)

export default memo(Profile)
