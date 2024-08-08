import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Loading, Searchbox, EmptyTable, Button } from '@components'

import { TeamInfo, ExposedForm, TeamExposedTo, TeamForm } from '@modules/leadManagement/components'
import { fetchTeamsCandidatesAndCompanies } from '@modules/leadManagement/api'

import { can } from '@utils/helpers'
import { EXPOSED_TEAMS_HEADS, EXPOSED_TEAMS_INITIAL_STATE } from '@constants/leadManagement'

import { CreateIcon } from '@icons'

const ExposedTeams = () => {
    const [vals, dispatch] = useReducer((prev, next) => ({ ...prev, ...next }), EXPOSED_TEAMS_INITIAL_STATE)
    const { data, error, isLoading, mutate } = useSWR(
        `api/candidate_management/candidate_teams/?search=${vals.query}`,
        fetchTeamsCandidatesAndCompanies
    )
    const handleChange = ({ target: { value, checked } }) =>
        checked
            ? dispatch({ ids: [...vals.ids, Number(value)] })
            : dispatch({ ids: vals.ids.filter(id => id !== Number(value)) })

    const handleChangeAll = ({ target: { checked } }) =>
        checked ? dispatch({ ids: data?.teams?.map(({ team }) => team?.id) ?? [] }) : dispatch({ ids: [] })

    const handleClick = () => dispatch({ show: true })

    if (isLoading) return <Loading />
    return (
        <div className='max-w-full mb-14 px-5'>
            <div className='flex items-center py-6 justify-between'>
                <div className='flex space-x-4 items-center'>
                    <Searchbox query={vals.query} setQuery={query => dispatch({ query })} />
                    {can('create_region') && (
                        <Button label='Create Team' fit icon={CreateIcon} onClick={() => handleClick()} />
                    )}
                </div>
                {vals.ids.length > 0 && (
                    <ExposedForm
                        candidates={vals.ids}
                        companies={data?.companies}
                        selectedCompanies={vals.selectedCompanies}
                        mutate={mutate}
                        dispatch={dispatch}
                    />
                )}
            </div>
            <table className='table-auto w-full text-sm text-left text-[#048C8C]'>
                <thead className='text-xs uppercase border border-[#048C8C]'>
                    <tr>
                        {can('expose_to') && (
                            <th scope='col' className='px-3 py-4'>
                                <input
                                    type='checkbox'
                                    className='__checkbox'
                                    onChange={handleChangeAll}
                                    checked={vals.ids.length === data?.teams?.length}
                                />
                            </th>
                        )}
                        {EXPOSED_TEAMS_HEADS.slice(1).map(heading => (
                            <th scope='col' className='px-3 py-4' key={heading}>
                                {heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.teams?.length > 0 && !error ? (
                        data?.teams?.map(row => (
                            <tr className='bg-white border-b border-[#006366] border-opacity-30' key={row.id}>
                                {can('expose_to') && (
                                    <td className='px-3 py-4'>
                                        <input
                                            type='checkbox'
                                            value={row?.id}
                                            checked={vals.ids.includes(row?.id)}
                                            className='__checkbox'
                                            onChange={handleChange}
                                        />
                                    </td>
                                )}
                                <TeamInfo info={row} exposed />
                                <TeamExposedTo companies={row?.exposed_to_companies} mutate={mutate} />
                            </tr>
                        ))
                    ) : (
                        <EmptyTable cols={4} msg='No teams found yet!' />
                    )}
                </tbody>
            </table>
            {vals.show && <TeamForm show={vals.show} setShow={dispatch} candidates={data?.candidates} />}
        </div>
    )
}

export default memo(ExposedTeams)
