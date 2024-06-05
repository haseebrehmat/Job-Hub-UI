import { memo, useReducer } from 'react'

import { Input, Button, CustomSelector } from '@components'
import { WEEK_DAYS_OPTIONS } from '@constants/scrapper'

const LeadFilters = ({ data, filtered = null, dispatch = null }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        members: filtered.members,
        teams: filtered.teams,
        skills: filtered.skills,
        companies: filtered.companies,
    })

    const applyFilters = () =>
        dispatch({
            from: vals.from,
            to: vals.to,
            members: vals.members,
            teams: vals.teams,
            skills: vals.skills,
            companies: vals.companies,
        })

    return (
        <div className='flex flex-wrap auto-cols-max items-end gap-x-4 gap-y-1 px-5 text-[#338d8c]'>
            <div>
                <span className='text-xs font-semibold'>From Date*</span>
                <Input
                    type='date'
                    onChange={({ target: { value } }) => update({ from: value, to: value > vals.to ? value : vals.to })}
                    value={vals.from}
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>To Date*</span>
                <Input type='date' onChange={e => update({ to: e.target.value })} value={vals.to} min={vals.from} />
            </div>
            <div>
                <span className='text-xs font-semibold'>Members*</span>
                <CustomSelector
                    options={data?.members}
                    handleChange={obj => update({ members: obj })}
                    selectorValue={vals.members}
                    isMulti
                    placeholder='Select Members'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>Teams*</span>
                <CustomSelector
                    options={data?.teams}
                    handleChange={obj => update({ teams: obj })}
                    selectorValue={vals.teams}
                    isMulti
                    placeholder='Select Teams'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>Skills*</span>
                <CustomSelector
                    options={WEEK_DAYS_OPTIONS}
                    handleChange={obj => update({ skills: obj })}
                    selectorValue={vals.skills}
                    isMulti
                    placeholder='Select Skills'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>Companies*</span>
                <CustomSelector
                    options={WEEK_DAYS_OPTIONS}
                    handleChange={obj => update({ companies: obj })}
                    selectorValue={vals.companies}
                    isMulti
                    placeholder='Select Companies'
                />
            </div>
            <Button label='Get' classes='!px-4 !py-2.5' fit onClick={applyFilters} />
        </div>
    )
}

export default memo(LeadFilters)
