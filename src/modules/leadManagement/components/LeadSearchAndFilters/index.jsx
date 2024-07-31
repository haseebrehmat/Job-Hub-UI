import { memo, useReducer } from 'react'
import useSWR from 'swr'

import { Input, Button, CustomSelector, Searchbox } from '@components'

import { LeadFilterByStatus } from '@modules/leadManagement/components'
import { fetchLeadFilters } from '@modules/leadManagement/api'

import { CandidateFilterIcon } from '@icons'

const LeadSearchAndFilters = ({ filtered = null, dispatch = null }) => {
    const { data, error } = useSWR('/api/lead_managament/leads_filters/', fetchLeadFilters, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
    })

    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        selectedMembers: filtered.members,
        team: filtered.team,
        stacks: filtered.stacks,
        candidates: filtered.candidates,
        members: filtered.team ? data?.members?.filter(t => t?.team?.includes(filtered.team.value)) : data?.members,
    })
    const applyFilters = () =>
        dispatch({
            from: vals.from,
            to: vals.to,
            members: vals.selectedMembers,
            team: vals.team,
            stacks: vals.stacks,
            candidates: vals.candidates,
        })
    const changeTeam = team =>
        update({ team, members: data?.members?.filter(t => t?.team?.includes(team?.value)), selectedMembers: [] })

    const clearFilters = () => {
        update({ to: '', from: '', members: [], stacks: [], team: '', candidates: [] })
        dispatch({
            filter: false,
            to: '',
            from: '',
            members: [],
            stacks: [],
            team: '',
            candidates: [],
            query: '',
            statusFilter: '',
        })
    }

    return (
        <>
            <div className='flex items-center justify-between gap-2 flex-wrap'>
                <div className='flex items-center gap-2'>
                    <Searchbox query={filtered.query} setQuery={query => dispatch({ query })} clear={clearFilters} />
                    <Button
                        icon={CandidateFilterIcon}
                        label='Filters'
                        onClick={() => dispatch({ filter: !filtered.filter })}
                        fit
                        fill={filtered.filter}
                    />
                </div>
            </div>
            <LeadFilterByStatus active={filtered.statusFilter} dispatch={dispatch} />
            {filtered.filter ? (
                <div className='grid grid-cols-4 auto-cols-max items-end gap-x-4 gap-y-2 p-4 text-[#338d8c] bg-slate-50 border border-cyan-600 rounded-xl'>
                    <div>
                        <span className='text-xs font-semibold'>From Date</span>
                        <Input
                            type='date'
                            onChange={({ target: { value } }) =>
                                update({ from: value, to: vals.to && value > vals.to ? value : vals.to })
                            }
                            value={vals.from}
                        />
                    </div>
                    <div>
                        <span className='text-xs font-semibold'>To Date</span>
                        <Input
                            type='date'
                            onChange={e => update({ to: e.target.value })}
                            value={vals.to}
                            min={vals.from}
                        />
                    </div>
                    {!error ? (
                        <>
                            {data?.members?.length > 0 && (
                                <div>
                                    <span className='text-xs font-semibold'>Members</span>
                                    <CustomSelector
                                        options={vals.members}
                                        handleChange={obj => update({ selectedMembers: obj })}
                                        selectorValue={vals.selectedMembers}
                                        isMulti
                                        placeholder='Select Members'
                                    />
                                </div>
                            )}
                            {data?.teams?.length > 0 && (
                                <div>
                                    <span className='text-xs font-semibold'>Team</span>
                                    <CustomSelector
                                        options={data?.teams}
                                        handleChange={obj => changeTeam(obj)}
                                        selectorValue={vals.team}
                                        placeholder='Select Team'
                                    />
                                </div>
                            )}
                            {data?.stacks?.length > 0 && (
                                <div>
                                    <span className='text-xs font-semibold'>Tech Stacks</span>
                                    <CustomSelector
                                        options={data?.stacks}
                                        handleChange={obj => update({ stacks: obj })}
                                        selectorValue={vals.stacks}
                                        isMulti
                                        placeholder='Select Stacks'
                                    />
                                </div>
                            )}
                            {data?.candidates?.length > 0 && (
                                <div>
                                    <span className='text-xs font-semibold'>Candidates</span>
                                    <CustomSelector
                                        options={data?.candidates}
                                        handleChange={obj => update({ candidates: obj })}
                                        selectorValue={vals.candidates}
                                        isMulti
                                        placeholder='Select Candidates'
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <small>There is an error in loading filters data</small>
                    )}
                    <Button label='Apply' classes='!px-8 !py-2' fit onClick={applyFilters} />
                </div>
            ) : null}
        </>
    )
}

export default memo(LeadSearchAndFilters)
