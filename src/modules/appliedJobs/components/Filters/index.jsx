import { memo, useReducer } from 'react'

import { Input, Button, CustomSelector } from '@components'

import { JOB_SOURCE_OPTIONS_UNDERSCORE } from '@constants/scrapper'

const Filters = ({ filtered = null, dispatch = null }) => {
    const [vals, update] = useReducer((prev, next) => ({ ...prev, ...next }), {
        from: filtered.from,
        to: filtered.to,
        stacks: filtered.stacks,
    })
    const applyFilters = () =>
        dispatch({
            from: vals.from,
            to: vals.to,
            stacks: vals.stacks,
        })

    const clearFilters = () => {
        dispatch({ from: '', to: '', stacks: [], filter: false })
        update({ from: '', to: '', stacks: [] })
    }

    return (
        <div className='grid grid-cols-4 auto-cols-max items-end gap-x-3 gap-y-1 mx-2 mb-3 p-4 shadow-md text-[#338d8c] rounded-xl bg-slate-100 border'>
            <div>
                <span className='text-xs font-semibold'>From Date</span>
                <Input
                    type='date'
                    onChange={({ target: { value } }) =>
                        update({ from: value, to: vals.to && value > vals.to ? value : vals.to })
                    }
                    value={vals.from}
                    classes='bg-white'
                />
            </div>
            <div>
                <span className='text-xs font-semibold'>To Date</span>
                <Input
                    type='date'
                    onChange={e => update({ to: e.target.value })}
                    value={vals.to}
                    min={vals.from}
                    classes='bg-white'
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
                {(filtered.from || filtered.to || filtered.stacks.length > 0) && (
                    <Button fit onClick={clearFilters} label='Clear' />
                )}
            </div>
        </div>
    )
}

export default memo(Filters)
