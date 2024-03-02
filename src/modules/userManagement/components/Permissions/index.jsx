import { memo } from 'react'
import useSwr from 'swr'

import { fetchPermissions } from '@modules/userManagement/api'
import { transformPascal } from '@/utils/helpers'

const Permissions = ({ permissions, setPermissions }) => {
    const { data, isLoading } = useSwr('/api/auth/all_permissions/', fetchPermissions)
    const handleChange = e => {
        const { value } = e.target
        let updatedPermissions = [...permissions]
        if (permissions.includes(parseInt(value, 10))) {
            updatedPermissions = permissions.filter(p => p !== parseInt(value, 10))
        } else {
            updatedPermissions.push(parseInt(value, 10))
        }
        setPermissions(updatedPermissions)
    }
    if (isLoading) return <div>Loading permissions....</div>

    return (
        <div className='max-w-full overflow-x-auto'>
            <p className='pb-2 font-semibold'>Assign Permissions</p>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        <th scope='col' className='px-2 py-4'>
                            Modules
                        </th>
                        <th scope='col' className='px-2 py-4'>
                            Permissions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data?.permissions?.length > 0 ? (
                        data?.permissions.map((perm, idx) => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={idx}>
                                <td className='px-2 py-2'>{transformPascal(perm.module)}</td>
                                <td className='px-2 py-2 grid grid-cols-2 gap-3'>
                                    {perm?.permission?.map(({ codename, name }) => (
                                        <div className='flex items-center' key={codename}>
                                            <input
                                                id={`checkbox-${codename}`}
                                                type='checkbox'
                                                name='permissions'
                                                defaultValue={codename}
                                                defaultChecked={permissions.indexOf(codename) !== -1}
                                                onChange={handleChange}
                                                className='w-4 h-4 rounded accent-cyan-600 focus:ring-0'
                                            />
                                            <label
                                                htmlFor={`checkbox-${codename}`}
                                                className='ml-2 text-sm text-[#006366] capitalize'
                                            >
                                                {name}
                                            </label>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className='bg-white border-b border-[#006366] border-opacity-30'>
                            <td className='px-2 py-2' colSpan={2}>
                                No Permissions Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default memo(Permissions)
