import { memo, useState } from 'react'
import useSWR from 'swr'

import { Loading, EmptyTable, Button, Badge } from '@components'

import { TeamForm } from '@modules/userManagement/components'
import { fetchTeams } from '@modules/userManagement/api'

import { teamHeads } from '@constants/userManagement'

import { CreateIcon, ActionsIcons } from '@icons'
import { can } from '@/utils/helpers'

const Teams = () => {
    const [team, setTeam] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR('/api/auth/team/', fetchTeams)
    const handleClick = row => {
        setTeam(row)
        setShow(!show)
    }

    if (isLoading) return <Loading />

    const renderTeams = error ? (
        <EmptyTable cols={6} msg='Failed to load teams..' />
    ) : data?.teams?.length > 0 ? (
        data?.teams?.map((row, idx) => (
            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                <td className='px-3 py-6'>{idx + 1}</td>
                <td className='px-3 py-6 capitalize'>{row?.name ?? '-'}</td>
                <td className='px-3 py-6 capitalize'>
                    <span className=' flex flex-col justify-center'>
                        {row?.reporting_to?.username}
                        <span className='font-mono'>{row?.reporting_to?.email}</span>
                    </span>
                </td>
                <td className='px-3 py-4'>
                    <span className='flex items-center gap-1'>
                        {row?.members?.map((member, idxx) => (
                            <div className='gap-2' key={idxx}>
                                <Badge label={member?.username} />
                            </div>
                        ))}
                    </span>
                </td>
                <td className='px-3 py-6 float-right' onClick={() => handleClick(row)}>
                    {can('edit_team') && ActionsIcons}
                </td>
            </tr>
        ))
    ) : (
        <EmptyTable cols={6} msg='No teams found yet!' />
    )
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 pb-6 float-right'>
                {can('create_team') && (
                    <Button
                        label='Create Team'
                        fit
                        icon={CreateIcon}
                        onClick={() => handleClick({ name: '', reporting_to: '', members: [] })}
                    />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {teamHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderTeams}</tbody>
            </table>
            {show && can('edit_team') && <TeamForm show={show} setShow={setShow} mutate={mutate} team={team} />}
        </div>
    )
}

export default memo(Teams)
