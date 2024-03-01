import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Filters, Button } from '@components'

import { RoleForm } from '@modules/userManagement/components'
import { fetchRoles } from '@modules/userManagement/api'

import { roleHeads } from '@constants/userManagement'

import { CreateIcon, ActionsIcons } from '@icons'

const Roles = () => {
    const [query, setQuery] = useState()
    const [role, setRole] = useState()
    const [show, setShow] = useState(false)
    const { data, error, isLoading, mutate } = useSWR('/api/auth/role_association/', fetchRoles)
    const handleClick = ({ name, code, description, group, id }) => {
        setRole({ name, code, description, group: group.id, id })
        setShow(!show)
    }
    if (isLoading) return <Loading />
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 py-6'>
                <Searchbox query={query} setQuery={setQuery} />
                <Filters />
                <Button
                    label='Create Role'
                    fit
                    icon={CreateIcon}
                    onClick={() => handleClick({ name: '', code: '', description: '', group: '' })}
                />
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {roleHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.roles?.length > 0 && !error ? (
                        data?.roles?.map((row, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                <td className='px-3 py-6'>{idx + 1}</td>
                                <td className='px-3 py-6'>{row?.name}</td>
                                <td className='px-3 py-6'>{row?.description}</td>
                                <td className='px-3 py-6'>{row?.group?.name}</td>
                                <td className='px-3 text-2xl italic font-mono'>{row?.code}</td>
                                <td className='px-3 py-6 float-right' onClick={() => handleClick(row)}>
                                    {ActionsIcons}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={6} msg='No roles found yet!' />
                    )}
                </tbody>
            </table>
            {show && <RoleForm show={show} setShow={setShow} mutate={mutate} role={role} />}
        </div>
    )
}

export default memo(Roles)
