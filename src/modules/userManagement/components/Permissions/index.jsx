import { memo } from 'react'

import data from './data'

const Permissions = ({ permissions, setPermissions }) => {
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

    return (
        <div className='max-w-full overflow-x-auto'>
            <p className='pb-2 font-semibold'>Assign Permissions</p>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        <th className='px-2 py-4'>#</th>
                        <th scope='col' className='px-2 py-4'>
                            Modules
                        </th>
                        <th scope='col' className='px-2 py-4'>
                            Permissions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((perm, idx) => (
                        <tr className='bg-white border-b border-[#006366] border-opacity-30' key={idx}>
                            <td className='px-2 py-2'>{idx + 1}</td>
                            <td className='px-2 py-2'>{perm.module}</td>
                            <td className='px-2 py-2 grid grid-cols-2 gap-3'>
                                {perm.permissions.map(({ codename, name, id }) => (
                                    <div className='flex items-center' key={codename}>
                                        <input
                                            id={`checkbox-${codename}`}
                                            type='checkbox'
                                            name='permissions'
                                            defaultValue={id}
                                            defaultChecked={permissions.indexOf(id) !== -1}
                                            onChange={handleChange}
                                            className='w-4 h-4 rounded accent-cyan-600 focus:ring-0'
                                        />
                                        <label htmlFor={`checkbox-${codename}`} className='ml-2 text-sm text-[#006366]'>
                                            {name}
                                        </label>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default memo(Permissions)
