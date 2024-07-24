import { memo, useReducer } from 'react'

import { Button, CustomSelector } from '@components'

import { FilterDates } from '@modules/teamAppliedJobs/components'

import { parseMembers } from '@utils/helpers'
import { JOB_SOURCE_OPTIONS_UNDERSCORE, JOB_SOURCE_OPTIONS, JOB_TYPES_OPTIONS } from '@constants/scrapper'
import { TEAM_APPLIED_JOBS_INITIAL_VALS as initFilters } from '@constants/teamAppliedJobs'

const Filters = ({ filtered = null, dispatch = null, data = null }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        start: filtered.start,
        end: filtered.end,
        stacks: filtered.stacks,
        sources: filtered.sources,
        types: filtered.types,
        bd: filtered.bd,
    })
    const applyFilters = () =>
        dispatch({
            start: vals.start,
            end: vals.end,
            stacks: vals.stacks,
            sources: vals.sources,
            types: vals.types,
            bd: vals.bd,
        })
    const clearFilters = () => {
        dispatch({ ...initFilters })
        update({ start: '', end: '', stacks: [], sources: [], types: [], bd: initFilters.bd })
    }

    return (
        <div className='grid grid-cols-4 auto-cols-max items-end gap-x-3 gap-y-1 mx-2 mb-3 p-4 shadow-md text-[#338d8c] rounded-xl bg-slate-100 border'>
            <div>
                <span className='text-xs font-semibold'>Team Member</span>
                <CustomSelector
                    options={parseMembers(data?.team_members, null, true)}
                    handleChange={obj => update({ bd: obj })}
                    selectorValue={vals.bd}
                    placeholder='Select Team Member'
                />
            </div>
            <FilterDates vals={vals} update={update} />
            <div>
                <span className='text-xs font-semibold'>Job Sources</span>
                <CustomSelector
                    options={JOB_SOURCE_OPTIONS}
                    handleChange={obj => update({ sources: obj })}
                    selectorValue={vals.sources}
                    isMulti
                    placeholder='Select Sources'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>Job Types</span>
                <CustomSelector
                    options={JOB_TYPES_OPTIONS}
                    handleChange={obj => update({ types: obj })}
                    selectorValue={vals.types}
                    isMulti
                    placeholder='Select Types'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>Tech Stacks</span>
                <CustomSelector
                    options={JOB_SOURCE_OPTIONS_UNDERSCORE}
                    handleChange={obj => update({ stacks: obj })}
                    selectorValue={vals.stacks}
                    isMulti
                    placeholder='Select Stacks'
                />
            </div>
            <div className='flex items-center gap-2'>
                <Button label='Apply' classes='!px-8 !py-2' fit onClick={applyFilters} />
                {(filtered.start ||
                    filtered.end ||
                    filtered.bd?.value !== 'all' ||
                    filtered.stacks.length > 0 ||
                    filtered.sources.length > 0 ||
                    filtered.types.length > 0) && <Button fit onClick={clearFilters} label='Clear' />}
            </div>
        </div>
    )
}

export default memo(Filters)
