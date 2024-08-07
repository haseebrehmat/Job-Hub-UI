import { memo } from 'react'

import { Tooltip } from '@components'

const roles = [
    {
        id: '1',
        title: 'Admin',
    },
    {
        id: '2',
        title: 'Coordinator',
    },
    {
        id: '3',
        title: 'Applier',
    },
]

const RolesSidebar = () => (
    <aside
        className='sm:flex hidden w-fit
             sm:flex-col border-2 py-6 text-[#048C8C] bg-[#EDFFFB] h-screen hide_scrollbar px-1.5'
    >
        <div className='flex flex-col gap-3.5 justify-center items-center'>
            {roles.map(role => (
                <Tooltip text={role.title} down key={role.id}>
                    <div className='bg-[#4ab9a7] text-white p-2 uppercase font-semibold rounded-lg cursor-pointer hover:bg-[#048C8C] active:bg-[#1c5655]'>
                        {role.title.length < 2 ? role.title : role.title.slice(0, 2)}
                    </div>
                </Tooltip>
            ))}
        </div>
    </aside>
)

export default memo(RolesSidebar)
