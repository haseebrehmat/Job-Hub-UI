import { memo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useSWR from 'swr'

import { Loading, EmptyTable, Badge, Tooltip } from '@components'

import { PseudosMemberForm } from '@modules/userManagement/components'
import { fetchTeams } from '@modules/userManagement/api'

import { teamMemberHeads } from '@constants/userManagement'

import { can } from '@utils/helpers'
import { EditIcon } from '@icons'

const Team = () => {
    const location = useLocation()
    let team = ''
    if (location.state) {
        team = location.state.data
    }
    const [user, setUser] = useState()
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(`/api/auth/team/?search=`, fetchTeams)

    const handleClick = row => {
        setUser(row)
        setShow(!show)
    }
    // console.log('team', team.verticals)
    if (isLoading) return <Loading />

    const renderTeams = error ? (
        <EmptyTable cols={6} msg='Failed to load teams..' />
    ) : team?.members?.length > 0 ? (
        team?.members?.map((row, idx) => (
            <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                <td className='px-3 py-6'>{idx + 1}</td>
                <td className='px-3 py-6 capitalize'>{row?.username ?? '-'}</td>
                <td className='px-3 py-6 capitalize'>
                    <span className=' flex flex-col justify-center'>
                        {row?.reporting_to?.username}
                        <span className='font-mono'>{row?.email}</span>
                    </span>
                </td>
                <td className='px-3 py-4'>
                    <span className='flex items-center gap-1'>
                        {row?.vertical?.map(member => (
                            <div className='gap-2'>
                                <Badge label={member} />
                            </div>
                        ))}
                    </span>
                </td>
                <td className='px-3 py-4'>
                    <Tooltip text='Assign Pesudos'>
                        <span onClick={() => handleClick(row, '')}>{can('edit_team') && EditIcon}</span>
                    </Tooltip>
                </td>
            </tr>
        ))
    ) : (
        <EmptyTable cols={6} msg='No members found yet!' />
    )
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex flex-col border shadow	text-[#006366] py-8 font-semibold px-6 mb-4'>
                <h1>Assigned Vertivals</h1>
                {team.verticals?.length > 0 &&
                    team.verticals?.map(tag => (
                        <span
                            key={tag.value}
                            className='inline-block  my-2 px-2.5 py-1.5 text-sm font-semibold bg-gray-200 rounded-full items-center mx-1'
                        >
                            <span>{tag.name}</span>
                            <button
                                type='button'
                                onClick=''
                                className='ml-2 text-gray-700 font-semibold focus:outline-none hover:text-red-700'
                            ></button>
                        </span>
                    ))}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {teamMemberHeads.map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>{renderTeams}</tbody>
            </table>
            {show && can('edit_team') && (
                <PseudosMemberForm show={show} setShow={setShow} mutate={mutate} user={user} vert={team.verticals} />
            )}
        </div>
    )
}

export default memo(Team)
