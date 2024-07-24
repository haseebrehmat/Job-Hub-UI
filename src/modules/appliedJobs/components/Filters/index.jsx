import { memo, useReducer } from 'react'

import { Button, CustomSelector } from '@components'

import { FilterDates } from '@modules/appliedJobs/components'

import { JOB_SOURCE_OPTIONS_UNDERSCORE, JOB_SOURCE_OPTIONS, JOB_TYPES_OPTIONS } from '@constants/scrapper'

const Filters = ({ filtered = null, dispatch = null, agent = false }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        stacks: filtered.stacks,
        sources: filtered.sources,
        types: filtered.types,
        agent: filtered.agent,
    })
    const applyFilters = () =>
        dispatch({
            from: vals.from,
            to: vals.to,
            stacks: vals.stacks,
            sources: vals.sources,
            types: vals.types,
            agent: vals.agent,
        })
    const clearFilters = () => {
        dispatch({ from: '', to: '', stacks: [], sources: [], types: [], agent: '', filter: false })
        update({ from: '', to: '', stacks: [], sources: [], types: [], agent: '' })
    }

    return (
        <div className='grid grid-cols-4 auto-cols-max items-end gap-x-3 gap-y-1 mx-2 mb-3 p-4 shadow-md text-[#338d8c] rounded-xl bg-slate-100 border'>
            <FilterDates vals={vals} update={update} />
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
            {agent && (
                <div>
                    <span className='text-xs font-semibold'>Agent (BD)</span>
                    <CustomSelector
                        options={JOB_TYPES_OPTIONS}
                        handleChange={obj => update({ agent: obj })}
                        selectorValue={vals.agent}
                        isMulti
                        placeholder='Select Agent (BD)'
                    />
                </div>
            )}
            <div className='flex items-center gap-2'>
                <Button label='Apply' classes='!px-8 !py-2' fit onClick={applyFilters} />
                {(filtered.from ||
                    filtered.to ||
                    filtered.stacks.length > 0 ||
                    filtered.sources.length > 0 ||
                    filtered.types.length > 0 ||
                    (agent && filtered.agent)) && <Button fit onClick={clearFilters} label='Clear' />}
            </div>
        </div>
    )
}

export default memo(Filters)
