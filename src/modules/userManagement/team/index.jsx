import { memo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useSWR from 'swr'

import { Button, Loading, EmptyTable, Badge, Tooltip } from '@components'

import { PseudosMemberForm } from '@modules/userManagement/components'
import { fetchTeamMembers } from '@modules/userManagement/api'

import { can } from '@utils/helpers'
import { teamMemberHeads } from '@constants/userManagement'

import { EditIcon, BackToIcon, CreateIcon } from '@icons'

const Team = () => {
    const { id } = useParams()
    const [user, setUser] = useState()
    const [role, setRole] = useState(null)
    const [show, setShow] = useState(false)

    const { data, error, isLoading, mutate } = useSWR(
        `api/profile/user_vertical_assignment/?team_id=${id}`,
        fetchTeamMembers
    )

    const handleClick = (row, userRole = null) => {
        setUser(row)
        setRole(userRole)
        setShow(!show)
    }
    if (isLoading) return <Loading />
    const renderTeams = error ? (
        <EmptyTable cols={6} msg='Failed to load team members..' />
    ) : data?.team?.members?.length > 0 ? (
        data?.team?.members?.map((row, idx) => (
            <tr className='bg-white border-b border-[#006366] border-opacity-30 hover:bg-gray-100' key={row.id}>
                <td className='px-3 py-6'>{idx + 1}</td>
                <td className='px-3 py-6 capitalize'>{row?.username ?? '-'}</td>
                <td className='px-3'>
                    <span className=' flex flex-col justify-center'>
                        <span className='capitalize'>{row?.reporting_to?.username}</span>
                        <span className='font-mono'>{row?.email}</span>
                    </span>
                </td>
                <td className='px-3 py-4'>
                    <span className='flex items-center flex-wrap'>
                        {row?.regions?.length > 0
                            ? row?.regions?.map(region => (
                                  <Badge
                                      key={region?.value}
                                      label={region?.label}
                                      type='success'
                                      classes='!py-0.5 !px-1.5 mx-1 my-2 text-xs border border-green-500'
                                  />
                              ))
                            : '-'}
                    </span>
                </td>
                <td className='px-3 py-4'>
                    <span className='flex items-center flex-wrap gap-2'>
                        {row?.roles?.length > 0
                            ? row?.roles?.map(
                                  item =>
                                      item?.value &&
                                      item?.verticals?.length > 0 && (
                                          <div
                                              className='border border-[#53a1a1] rounded-full flex items-center'
                                              key={item?.value}
                                          >
                                              <span className='capitalize ml-1.5 font-semibold'>
                                                  {item?.label ?? 'No Role'}:
                                              </span>
                                              <span className='flex items-center flex-wrap'>
                                                  {item?.verticals?.length > 0
                                                      ? item?.verticals?.map(member => (
                                                            <div className='mx-1 my-2' key={member?.id}>
                                                                <Badge label={`${member?.pseudo} | ${member?.name}`} />
                                                            </div>
                                                        ))
                                                      : '-'}
                                              </span>
                                              <Tooltip text='Update verticals'>
                                                  <span
                                                      className='mr-1 p-1 bg-[#4ab9a7] rounded-2xl text-white'
                                                      onClick={() =>
                                                          handleClick(row, { id: item?.value, name: item?.label })
                                                      }
                                                  >
                                                      {EditIcon}
                                                  </span>
                                              </Tooltip>
                                          </div>
                                      )
                              )
                            : '-'}
                    </span>
                </td>
                <td className='px-3 py-4'>
                    {can('edit_member_team') && row?.regions?.length > 0 && (
                        <Tooltip text='Assign verticals'>
                            <span onClick={() => handleClick(row)}>{CreateIcon}</span>
                        </Tooltip>
                    )}
                </td>
            </tr>
        ))
    ) : (
        <EmptyTable cols={6} msg='No members found yet!' />
    )
    return (
        <div className='max-w-full overflow-x-auto mb-14 px-5'>
            <div className='flex border shadow text-[#006366] py-8 px-6 mb-4 justify-between'>
                <div className='flex flex-col'>
                    <p className='text-xl'>Assigned Verticals</p>
                    <div className='mt-4'>
                        {data?.team?.verticals?.length > 0 &&
                            data?.team?.verticals?.map(tag => (
                                <span key={tag.id}>
                                    <span className='inline-block my-2 px-2.5 py-1.5 text-sm bg-gray-200 rounded-full items-center mx-1'>
                                        <span className='font-semibold'>{`${tag?.pseudo?.name} | ${tag?.name} | `}</span>
                                        {tag?.regions?.length > 0 ? (
                                            tag?.regions?.map(r => r?.label).join(', ')
                                        ) : (
                                            <span className='text-red-600'>Please assign region</span>
                                        )}
                                    </span>
                                </span>
                            ))}
                    </div>
                </div>
                <Link to='/teams' className='float-right'>
                    <Button label='Back to teams' icon={BackToIcon} fit />
                </Link>
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
            {show && can('edit_member_team') && (
                <PseudosMemberForm
                    show={show}
                    setShow={setShow}
                    mutate={mutate}
                    user={user}
                    vert={data?.team?.verticals?.filter(row => row?.regions?.length > 0)}
                    teamId={id}
                    role={role}
                />
            )}
        </div>
    )
}

export default memo(Team)
