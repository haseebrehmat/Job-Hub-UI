import { memo, useReducer } from 'react'

import { Input, Button, CustomSelector } from '@components'

const LeadFilters = ({ data, filtered = null, dispatch = null }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        selectedMembers: filtered.members,
        team: filtered.team,
        stacks: filtered.stacks,
        members: data?.members || [],
    })
    const applyFilters = () =>
        dispatch({
            from: vals.from,
            to: vals.to,
            members: vals.selectedMembers,
            team: vals.team,
            stacks: vals.stacks,
        })
    const changeTeam = team => update({ team, members: data?.members?.filter(t => t?.team === team?.value) })

    return (
        <div className='flex flex-wrap auto-cols-max items-end gap-x-4 gap-y-1 px-5 text-[#338d8c]'>
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
                <Input type='date' onChange={e => update({ to: e.target.value })} value={vals.to} min={vals.from} />
            </div>
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
            <Button label='Get' classes='!px-4 !py-2' fit onClick={applyFilters} />
        </div>
    )
}

export default memo(LeadFilters)
