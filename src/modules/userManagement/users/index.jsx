import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Filters, Button } from '@components'

import { UserForm } from '@modules/userManagement/components'
import { fetchUsers } from '@modules/userManagement/api'

import { userHeads } from '@constants/userManagement'

import { CreateIcon, ActionsIcons } from '@icons'

const Users = () => {
    const [query, setQuery] = useState()
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR('/api/auth/user/', fetchUsers)
    const handleClick = ({ username, role, company, id }) => {
        setUser({ username, role, company, id })
        setShow(!show)
    }
    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                <Filters />
                <Button
                    label='Create User'
                    fit
                    icon={CreateIcon}
                    onClick={() => handleClick({ username: '', role: '', company: '' })}
                />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {userHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.users?.length > 0 && !error ? (
                        data?.users?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{row?.email}</td>
                                <td className='px-3 py-6'>{row?.username}</td>
                                <td className='px-3 py-6'>{row?.role?.name || 'not assigned'}</td>
                                <td className='px-3 py-6'>{row?.company?.name || 'not assigned'}</td>
                                <td className='px-3 py-6 float-right' onClick={() => handleClick(row)}>
                                    {ActionsIcons}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No users found yet!' />
                    )}
                </tbody>
            </table>
            {show && <UserForm show={show} setShow={setShow} mutate={mutate} user={user} />}
        </div>
    )
}

export default memo(Users)
