import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, EmptyTable, Button, Badge, Searchbox, Tooltip } from '@components'

import { TeamForm, PseudosTeamForm } from '@modules/userManagement/components'
import { fetchTeams } from '@modules/userManagement/api'

import { teamHeads } from '@constants/userManagement'

import { can } from '@utils/helpers'
import { CreateIcon, ActionsIcons, EditIcon } from '@icons'

const Teams = () => {
    const [team, setTeam] = useState()
    const [query, setQuery] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [showPesudoForm, setShowPesudoForm] = useState(false)
    const navigate = useNavigate()
    const { data, error, isLoading, mutate } = useSWR(`/api/auth/team/?search=${query}`, fetchTeams)
    const handleClick = (row, action) => {
        if (action === 'edit' || action === 'create') {
            setTeam(row)
            setShowEditForm(!showEditForm)
        } else {
            setShowPesudoForm(!showPesudoForm)
            setTeam(row)
        }
    }

    if (isLoading) return <Loading />

    const renderTeams = error ? (
        <EmptyTable cols={6} msg='Failed to load teams..' />
    ) : data?.teams?.length > 0 ? (
        data?.teams?.map((row, idx) => (
            <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                <td className='px-3 py-6'>{idx + 1}</td>
                <Tooltip text='Click to view | edit team members'>
                    <td
                        className='px-3 py-6 capitalize my-2 hover:cursor-pointer'
                        onClick={() =>
                            navigate('/team-details', {
                                state: {
                                    data: row,
                                    title: row?.name,
                                },
                            })
                        }
                    >
                        {row?.name ?? '-'}
                    </td>
                </Tooltip>
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
                <td className='px-3 py-6 flex space-x-4'>
                    <Tooltip text='Assign Pesudos'>
                        <span onClick={() => handleClick(row, '')}>{can('edit_team') && EditIcon}</span>
                    </Tooltip>
                    <Tooltip text='Edit Team'>
                        <span onClick={() => handleClick(row, 'edit')}>{can('edit_team') && ActionsIcons}</span>
                    </Tooltip>
                </td>
            </tr>
        ))
    ) : (
        <EmptyTable cols={6} msg='No teams found yet!' />
    )
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex items-center space-x-4 pb-6'>
                <Searchbox query={query} setQuery={setQuery} />
                {can('create_team') && (
                    <Button
                        label='Create Team'
                        fit
                        icon={CreateIcon}
                        onClick={() => handleClick({ name: '', reporting_to: '', members: [] }, 'create')}
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
            {showEditForm && can('edit_team') && (
                <TeamForm show={showEditForm} setShow={setShowEditForm} mutate={mutate} team={team} />
            )}
            {showPesudoForm && can('edit_team') && (
                <PseudosTeamForm show={showPesudoForm} setShow={setShowPesudoForm} mutate={mutate} team={team} />
            )}
        </div>
    )
}

export default memo(Teams)
