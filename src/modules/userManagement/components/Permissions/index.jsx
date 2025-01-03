import { memo, useEffect, useState } from 'react'

import { transformPascal } from '@utils/helpers'

import { permissions as data } from '@utils/constants/permissions'

const Permissions = ({ permissions, setPermissions }) => {
    const [permss, setPermss] = useState(
        data
            .flatMap(p => p.permissions)
            .map(c => ({ [c.codename]: permissions.includes(c.codename) }))
            .reduce((acc, cur) => ({ ...acc, ...cur }))
    )
    const handleChange = e => {
        const {
            value: key,
            checked: value,
            dataset: { parent, child },
        } = e.target
        setPermss(prev => ({ ...prev, [key]: value }))
        if (parent && value) parent?.split(',').forEach(p => setPermss(prev => ({ ...prev, [p]: value })))
        if (child && !value) child?.split(',').forEach(c => setPermss(prev => ({ ...prev, [c]: value })))
    }
    const handleModule = e => {
        const {
            checked,
            dataset: { perms },
        } = e.target
        perms?.split(',').forEach(p => setPermss(prev => ({ ...prev, [p]: checked })))
    }
    useEffect(() => {
        const allowedPermissions = Object.keys(permss).filter(k => permss[k])
        if (allowedPermissions.length > 0) setPermissions(allowedPermissions)
    }, [permss])
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
                    {data?.length > 0 ? (
                        data?.map((perm, idx) =>
                            perm?.permissions?.length > 0 ? (
                                <tr className='bg-white border-b border-[#006366] border-opacity-30' key={idx}>
                                    <td className='px-2 py-2'>
                                        <div className='flex items-center'>
                                            <input
                                                id={`checkbox-${idx}`}
                                                type='checkbox'
                                                name='permissions'
                                                data-perms={perm.permissions.map(({ codename }) => codename)}
                                                onChange={handleModule}
                                                className='w-6 h-4 rounded accent-cyan-600 focus:ring-0'
                                            />
                                            <label htmlFor={`checkbox-${idx}`} className='ml-2 text-sm'>
                                                {transformPascal(perm.module)}
                                            </label>
                                        </div>
                                    </td>
                                    <td className='px-2 py-2 grid grid-cols-2 gap-2'>
                                        {perm?.permissions?.map(({ codename, name, parent, child }) => (
                                            <div className='flex items-center' key={codename}>
                                                <input
                                                    id={`checkbox-${codename}`}
                                                    type='checkbox'
                                                    name='permissions'
                                                    data-parent={parent}
                                                    data-child={child}
                                                    value={codename}
                                                    checked={permss[codename]}
                                                    onChange={handleChange}
                                                    className='w-6 h-4 rounded accent-cyan-600 focus:ring-0'
                                                />
                                                <label
                                                    htmlFor={`checkbox-${codename}`}
                                                    className='ml-2 text-sm  capitalize'
                                                >
                                                    {name}
                                                </label>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ) : null
                        )
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
