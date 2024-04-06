import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, EmptyTable, Button } from '@components'

import { fetchUsers } from '@modules/userManagement/api'

import { can } from '@utils/helpers'

import { CreateIcon, TrashIcon, EditIcon } from '@icons'

const Skills = () => {
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/auth/user/?page=1`, fetchUsers)

    const handleClick = values => {
        setUser(values)
        setShow(!show)
    }

    if (isLoading) return <Loading />

    const flag = data?.users?.length > 0 && !error

    return (
        <div className='max-w-full overflow-x-auto mb-14 px-1'>
            <div className='flex items-center space-x-4 py-4'>
                {can('create_user') && (
                    <Button label='Add Skll' fit icon={CreateIcon} onClick={() => handleClick(null)} />
                )}
            </div>
            <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                {flag ? (
                    data?.users?.map((row, idx) => (
                        <div className='bg-white rounded-md p-4 border relative' key={idx}>
                            <h2 className='font-semibold text-lg'>{row?.username}</h2>
                            <div className='absolute top-0 right-0 mr-2 flex'>
                                <Button classes='_icon-btn' icon={TrashIcon} />
                                <Button classes='_icon-btn' icon={EditIcon} />
                            </div>
                            <div className='flex items-center mt-2'>
                                <div className='w-full bg-gray-200 rounded-lg overflow-hidden shadow-inner'>
                                    <div className='bg-[#4f9d9b] h-2' style={{ width: `${(idx + 1) * 20}%` }} />
                                </div>
                                <div className='ml-2'>{idx + 1}/5</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <EmptyTable cols={6} msg='No skills found yet!' />
                )}
            </div>
        </div>
    )
}

export default memo(Skills)
